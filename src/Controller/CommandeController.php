<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\ClientContoller;
use App\Repository\ClientRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Client;
use App\Entity\Commande;
use App\Repository\CommandeRepository;
use App\Repository\SecteurRepository;
use App\Repository\ProduitRepository;

#[Route('/commande', name: 'app_commande')]
class CommandeController extends AbstractController
{

    private $manager;
    public function __construct(ManagerRegistry $manager){
     
        $this->manager = $manager;
    }


    #[Route('/addCommand', name: 'app_commande_add')]
    public function createNewCommand(Request $request){

        $content = $request->getContent();
        $parsedContent = json_decode($content);
        
        if( isset($parsedContent->clientData) && isset($parsedContent->clientData)){


           
            $orderData = $parsedContent->orderData;
            // -------------------- Add Client If not exist ----------------------- //
           
            $clientData = $parsedContent->clientData;
            $clientController = new ClientContoller($this->manager);
            $clientRegistry = new ClientRepository($this->manager);
            $requestBis = new Request([],[],[],[],[],[],$content=json_encode($clientData));
            $JsonClient = $clientController->addNewClient($requestBis);
 
            $parsedNewClient = json_decode($JsonClient->getContent(), flags:JSON_INVALID_UTF8_SUBSTITUTE);

         
            // ----- prepare client for commande insertion ---- //

            $client = $clientRegistry->findOneClientById($parsedNewClient->id);
          
            // ---------------------- Prepare Order Data ------------------ //

            $orderData = $parsedContent->orderData;
            $orderType = $orderData->orderType;
            $productRepo = new ProduitRepository($this->manager);
            $orderProduct = $productRepo->findOneProductById($orderData->orderProductId);
            $orderQte = $orderData->orderQte;

            // ---------------- Create new command entity ------------- //

            $newCommand = new Commande();
            $newCommand->setDateCreation(date_create());
            $newCommand->setDateLivraison(null);
            $newCommand->setQuantite( $orderQte);
            $newCommand->setStatut( "En Attente");
            $newCommand->setType($orderType);
            $newCommand->setIdClient($client);
            $newCommand->setIdProduit($orderProduct);

            // ---------------- New command Insertion ------------- //
            $commandeRepo = new CommandeRepository($this->manager);
            $commandeRepo->add($newCommand,true);

            return new Response(json_encode($newCommand->toJson()));
            
        }


        return new Response("bad object");
    }



    #[Route('/getAllCommand', name: 'app_commande_getAll')]
    public function getAllCommand(Request $request){

        $commandRepo = new CommandeRepository($this->manager);

        $allOrders = $commandRepo->findAll();

        $result = [];

        foreach($allOrders as $order){
            array_push($result, $order->toJson());
        }

        return new Response(json_encode(($result)));

    }

}
