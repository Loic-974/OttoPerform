<?php

namespace App\Controller;

use App\Entity\Livraison;
use App\Repository\LivraisonRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/livraison', name: 'app_livraison')]
class LivraisonController extends AbstractController
{
    private $manager;

    public function __construct(ManagerRegistry $manager){
        $this->manager = $manager;
    }
    
    
    #[Route('/getlivraison', name: 'app_livraison')]
    public function getAllLivraison(): Response
    {
    
        $livraisonRepo = new LivraisonRepository($this->manager);

        $allLivraisons = $livraisonRepo->findAll();

        $result = array_map(fn($livraison) => $livraison->toJson(true),  $allLivraisons);

        return new Response(json_encode($result));
    }
}
