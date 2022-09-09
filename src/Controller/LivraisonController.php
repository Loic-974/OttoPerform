<?php

namespace App\Controller;

use App\Entity\Livraison;
use App\Repository\CommandeRepository;
use App\Repository\LivraisonRepository;
use App\Repository\LivreurRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/livraison', name: 'app_livraison')]
class LivraisonController extends AbstractController
{
    private $manager;

    public function __construct(ManagerRegistry $manager){
        $this->manager = $manager;
    }
    
    
    #[Route('/getlivraison', name: 'app_livraison_getAll')]
    public function getAllLivraison(): Response
    {
    
        $livraisonRepo = new LivraisonRepository($this->manager);

        $allLivraisons = $livraisonRepo->findAll();

        $result = array_map(fn($livraison) => $livraison->toJson(true),  $allLivraisons);

        return new Response(json_encode($result));
    }



    #[Route('/setLivraison', name: 'app_livraison_set')]
    public function setLivraisonToDeliveryMan(Request $request)
    {
        $content = $request->getContent();
        $parsedContent = json_decode($content);

        if(isset($parsedContent)&& !empty($parsedContent)){

            $livraisonRepo = new LivraisonRepository($this->manager);

            foreach($parsedContent as $cmd){

                if(isset($cmd->livreurId) && $cmd->commandeId ){

                    $livreurRepo = new LivreurRepository($this->manager);
                    $livreur = $livreurRepo->findOneLivreurById($cmd->livreurId);
                    $commandeRepo = new CommandeRepository($this->manager);
                    $commande= $commandeRepo->findOneCommandeById($cmd->commandeId);

                    if(isset($livreur) && isset($commande)){

                        $livraison = new Livraison();
                        $livraison->setIdCommande($commande);
                        $livraison->setIdLivreur($livreur);
                        $livraison->setDateLivraison(date_create());
                        $livraisonRepo->add($livraison ,true);
                        // ---- Update Order State ----
                        $commande->setStatut("En Livraison");
                        $commandeRepo->add( $commande,true);
                        return new Response("ok");
                    }
                    return new Response("Entite non toruvé");
                }
                return new Response("Objet Incorrect");
            }
            
        }
    

        return new Response("Objet Vide");
    }
}
