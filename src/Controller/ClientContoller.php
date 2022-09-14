<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use App\Repository\SecteurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

use function PHPUnit\Framework\isNull;

#[Route('/client', name: 'app_client')]
class ClientContoller extends AbstractController
{

    private $managerRegistry;


    public function __construct(ManagerRegistry $doc)
    {
        $this->managerRegistry = $doc;

    }


    #[Route('/clientList', name: 'app_client_list')]
    public function getClientList(){

        $userRepo = new ClientRepository( $this->managerRegistry);

        $userList = $userRepo->findAll();

        $result =[];

        foreach($userList as $user ){

           array_push($result,$user->toJson());
        }

        return new Response(json_encode($result,flags:JSON_INVALID_UTF8_IGNORE));
    }

    /**
     * Check if client already exist 
     * If not we create a new client
     *
     * @param Request $request
     * @return Object  client object
     */
    #[Route('/addClient', name: 'app_client_add')]
    public function addNewClient(Request $request){

        $clientRepo = new ClientRepository($this->managerRegistry);
        // Get Response Json Content
        $content = $request->getContent();
        $parsedContent = json_decode($content);

        // Check if the given json content include all required field and all data
        if($this->isClientRequestObjectComplete($parsedContent)){

                $clientName = $parsedContent->clientName;
                $clientFirstName =$parsedContent->clientFirstName;
                $clientAdresse=$parsedContent->clientAdresse;
                $clientVille=$parsedContent->clientVille;
                $clientCodeP=$parsedContent->clientCodeP;
                $clientSecteur=$parsedContent->clientSecteur;

               // Check if a the given client already exist
               $clientExist= $clientRepo->findExistingClient( $clientName, $clientFirstName, $clientAdresse,$clientCodeP, $clientVille);
            
               // If the client not exist we create and insert this client
               if(!isset($clientExist) && isNull($clientExist)){

                $secteurRepo = new SecteurRepository(($this->managerRegistry));

                $secteur = $secteurRepo->findOneSecteurById($clientSecteur);

                // If given sector exist
                if($secteur){

                $newClient = new Client();
                   $newClient->setNom( $clientName);
                   $newClient->setPrenom($clientFirstName);
                   $newClient->setAdresse( $clientAdresse);
                   $newClient->setVille($clientVille);
                   $newClient->setCodePostal($clientCodeP);
                   $newClient->setIdSecteur($secteur);

                   $clientRepo->add($newClient,true);
          
                   return new Response(json_encode($newClient->toJson(),flags:JSON_INVALID_UTF8_IGNORE));

                }else{
                    return new Response("Given sector not exist",424);
                }

               }
               return new Response(json_encode($clientExist->toJson(),flags:JSON_INVALID_UTF8_IGNORE));
        }
    
        return new Response("L'objet fournit ne contient pas tous les champs requis",424);

    }
    
    /**
     * Check if the given content include all required field
     * @param [type] $parsedContent
     * @return boolean
     */
    public function isClientRequestObjectComplete($parsedContent){

            $result =false;

            $clientData = $parsedContent;
            // $clientData = $parsedContent->clientData;

            if(isset($clientData->clientName)
            &&isset($clientData->clientFirstName)
            &&isset($clientData->clientAdresse)
            &&isset($clientData->clientVille)
            &&isset($clientData->clientCodeP)
            &&isset( $clientData->clientSecteur)
            ){
                $clientName = $clientData->clientName;
                $clientFirstName =$clientData->clientFirstName;
                $clientAdresse=$clientData->clientAdresse;
                $clientVille=$clientData->clientVille;
                $clientCodeP=$clientData->clientCodeP;
                $clientSecteur=$clientData->clientSecteur;

                if( $clientName!=="" && 
                $clientFirstName!==""&& 
                $clientAdresse!==""&& 
                $clientVille!=""&& 
                $clientCodeP!==""&& 
                $clientSecteur!==0 
                ){
                    $result = true;
                }

            }

            return $result;
        }
    
}
