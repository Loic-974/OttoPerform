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

use function PHPSTORM_META\type;

#[Route('/commande', name: 'app_commande')]
class CommandeController extends AbstractController
{

    private $manager;
    public function __construct(ManagerRegistry $manager){
     
        $this->manager = $manager;
    }


    /**
     *  Check received data and insert a new order in case of data is valid
     *  Also create a new user in case of user not already exist
     * */ 
    #[Route('/addCommand', name: 'app_commande_add')]
    public function createNewCommand(Request $request){

        // ----- Get Ajax json object ----
        $content = $request->getContent();
        $parsedContent = json_decode($content);
        
        // ------ check if the data have the both needed content --------------
        if( isset($parsedContent->clientData) && isset($parsedContent->orderData)){

            $orderData = $parsedContent->orderData;
            $clientData = $parsedContent->clientData;
            // Check if every order data field is valid.
            if(isset($orderData->orderType)&& gettype($orderData->orderType)==="string" 
            &&isset($orderData->orderProductId) && gettype($orderData->orderProductId)==="integer"
             &&isset($orderData->orderQte) && gettype($orderData->orderQte)==="integer" && $orderData->orderQte>0
             // Client check
             &&isset($clientData->clientName) && gettype($clientData->clientName)==="string"
             &&isset($clientData->clientFirstName) && gettype($clientData->clientFirstName)==="string"
             &&isset($clientData->clientAdresse) && gettype($clientData->clientAdresse)==="string"
             &&isset($clientData->clientVille) && gettype($clientData->clientVille)==="string"
             &&isset($clientData->clientCodeP) && gettype($clientData->clientCodeP)==="string"
             &&isset($clientData->clientSecteur) && gettype($clientData->clientSecteur)==="integer" 
             ){
    
            // -------------------- Add Client If not exist ----------------------- //
                
            $clientController = new ClientContoller($this->manager);
            $clientRegistry = new ClientRepository($this->manager);

            // Create a new request to fit with the ClientRepository signature
            $requestBis = new Request([],[],[],[],[],[],$content=json_encode($clientData));

            // addNewClient already check if client exist before create an another one
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
        
        return new Response("Les informations de la commande ne sont pas correctes",424);
    }

        return new Response("Les informations rentrées ne sont pas complètes",424);
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


    #[Route('/getAllCommandByState', name: 'app_commande_getAllByState')]
    public function getAllCommandByState(Request $request){

        $unParsedContent = $request->getContent();
        $parsedContent = json_decode($unParsedContent);

        if(isset($parsedContent->orderState)){
            $commandRepo = new CommandeRepository($this->manager);

            $allOrders = $commandRepo->findAllByState($parsedContent->orderState);

            $result = [];

            foreach($allOrders as $order){
                array_push($result, $order->toJson());
            }

            return new Response(json_encode(($result)));
        }
        return new Response(json_encode(([])));
    }



}
