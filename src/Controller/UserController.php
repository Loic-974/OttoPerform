<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use App\Entity\User;


use function PHPUnit\Framework\isEmpty;

#[Route('/user', name: 'api_user')]
class UserController extends AbstractController
{

    private $managerRegistry;


    public function __construct(ManagerRegistry $doc)
    {
        $this->managerRegistry = $doc;

    }



    #[Route('/userAdd', name: 'api_user_add')]

    public function userAdd(Request $request){
      var_dump(json_decode($request->getContent()));
      return new Response();
    }



    #[Route('/userConnexion', name: 'api_user_connexion')]
    public function userConnexion(Request $request){
    
     $session =  $request->getSession();
     if(!$session->isStarted()) $session->start();

    
      $state =[ 
        "connexionAllowed"=>false,
        "userRole"=>""
      ];

      if( $session->get("userRole")){
        echo("toto");
      //  session_destroy();
      $state["connexionAllowed"] = true;
      $state["userRole"] = $session->get("userRole");
      // $state["userRole"] = $_SESSION["userRole"];
      
      }else{

        
        $parsedRequest = json_decode($request->getContent());

        if( isset($parsedRequest->userEmail) && isset($parsedRequest->password) ){


        $email = $parsedRequest->userEmail;
        $password =  $parsedRequest->password;

          if( is_string($email) && is_string($password) && $password!=="" && $email !== ""){

            $userRepo = new UserRepository( $this->managerRegistry);

            $user =  $userRepo->findByEmail($email);

            if( $user && $user->getPassword()==$password) {


              $session->set("userRole",$user->getRole());
              $session->set("userEmail",$user->getEmail());
              $session->set("userName",$user->getPrenom());
              $session->set("userId",$user->getId());


              // $_SESSION['userName']= $user->getPrenom();
              // $_SESSION['userEmail']= $user->getEmail();
              // $_SESSION['userRole']= $user->getRole();
              // $_SESSION['userId']=$user->getId();

              $state["connexionAllowed"] = true;
              $state["userRole"] = $user->getRole();

              $session->save();

              // Ajouter le path de base
          
            }
         }
        }
      }

      return new Response( json_encode($state));
    }





    #[Route('/isUserConnected', name: 'api_user_state')]
    public function isUserConnected(Request $request){

      session_start();

      if(isset($_SESSION['userId'])){
        $_SESSION["isAuth"]=true;
      }
  
     return new Response(json_encode( $_SESSION)||null);
    
    }


}