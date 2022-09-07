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

        return new Response(json_encode($result));
    }

    #[Route('/addClient', name: 'app_client_add')]
    public function addNewClient(Request $request){

        $clientRepo = new ClientRepository($this->managerRegistry);

        $content = $request->getContent();
        $parsedContent = json_decode($content);

   

        if($this->isClientRequestObjectComplete($parsedContent)){

            $clientData = $parsedContent->clientData;
                $clientName = $clientData->clientName;
                $clientFirstName =$clientData->clientFirstName;
                $clientAdresse=$clientData->clientAdresse;
                $clientVille=$clientData->clientVille;
                $clientCodeP=$clientData->clientCodeP;
                $clientSecteur=$clientData->clientSecteur;

               $clientExist= $clientRepo->findExistingClient( $clientName, $clientFirstName, $clientAdresse, $clientVille,$clientCodeP);
    
               if(isNull($clientExist)){

                $secteurRepo = new SecteurRepository(($this->managerRegistry));

                $secteur = $secteurRepo->findOneSecteurById($clientSecteur);

                if($secteur){

                $newClient = new Client();
                   $newClient->setNom( $clientName);
                   $newClient->setPrenom($clientFirstName);
                   $newClient->setAdresse( $clientAdresse);
                   $newClient->setVille($clientVille);
                   $newClient->setCodePostal($clientCodeP);
                   $newClient->setIdSecteur($secteur);

                   $clientRepo->add($newClient,true);
          

                   return new Response(json_encode($newClient->toJson()));

                }else{
                    return new Response("fail-secteur");
                }

               }

               return new Response("fail-alreadyexist");
        }
        $test = $this->isClientRequestObjectComplete($parsedContent);
        return new Response(json_encode(["test"=>$test]));

    }
    

    // const clientData = {
    //     clientName,
    //     clientFirstName,
    //     clientAdresse,
    //     clientVille,
    //     clientCodeP,
    //     clientSecteur,
    // };

 


    private function isClientRequestObjectComplete($parsedContent){

            $result =false;

            $clientData = $parsedContent->clientData;

            if(isset($clientData->clientName)
            &&isset($clientData->clientFirstName)
            &&isset($clientData->clientAdresse)
            &&isset($clientData->clientVille)
            &&isset($clientData->clientCodeP)
            &&isset( $clientData->clientSecteur)
            ){
                // $clientName = $clientData->clientName;
                // $clientFirstName =$clientData->clientFirstName;
                // $clientAdresse=$clientData->clientAdresse;
                // $clientVille=$clientData->clientVille;
                // $clientCodeP=$clientData->clientCodeP;
                // $clientSecteur=$clientData->clientSecteur;

                // if( $clientName!=="" && !isNull( $clientName) &&
                // $clientFirstName!==""&& !isNull(  $clientFirstName) &&
                // $clientAdresse!==""&& !isNull( $clientAdresse) &&
                // $clientVille!=""&& !isNull(  $clientVille) &&
                // $clientCodeP!==""&& !isNull(    $clientCodeP) &&
                // $clientSecteur!==0 && !isNull( $clientSecteur) 
                // ){
                    $result = true;
                //}

            }

            return $result;
        }
    
}
