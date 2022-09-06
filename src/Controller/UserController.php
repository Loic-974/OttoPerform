<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

#[Route('/user', name: 'api_user')]
class UserController extends AbstractController
{

    private $managerRegistry;


    public function __construct(ManagerRegistry $doc)
    {
        $this->managerRegistry = $doc;

    }



    // #[Route('/userAdd', name: 'api_user_add')]

    // public function userAdd(Request $request){
    //   var_dump(json_decode($request->getContent()));
    //   return new Response();
    // }


    /**
     * Check if given credentials match with an user 
     * if yes we return a truthy state else return false state
     * - Open Session and store user data inside -
     * @param Request $request
     * @return {connexionAllowed : boolean , userRole:string|null}
     */
    #[Route('/userConnexion', name: 'api_user_connexion')]
    public function userConnexion(Request $request){
    
     $session =  $request->getSession();
     if(!$session->isStarted()) $session->start();

    
      $state =[ 
        "connexionAllowed"=>false,
        "userRole"=>"",
        "userEmail"=> "",
      ];

      if( $session->get("userRole")){
   
      $state["connexionAllowed"] = true;
      $state["userRole"] = $session->get("userRole");
      $state["userEmail"] = $session->get("userEmail");
  
      
      } else {

        
        $parsedRequest = json_decode($request->getContent());

        if( isset($parsedRequest->userEmail) && isset($parsedRequest->password) ){


        $email = $parsedRequest->userEmail;
        $password =  $parsedRequest->password;

          if( is_string($email) && is_string($password) && $password!=="" && $email !== ""){

            $userRepo = new UserRepository( $this->managerRegistry);

            $user =  $userRepo->findByEmail($email);

            // Update with Hash password later
            if( $user && $user->getPassword()==$password) {


              $session->set("userRole",$user->getRole());
              $session->set("userEmail",$user->getEmail());
              $session->set("userName",$user->getPrenom());
              $session->set("userId",$user->getId());

              $state["connexionAllowed"] = true;
              $state["userRole"] = $user->getRole();
              $state["userEmail"] = $user->getEmail();

              $session->save();
      
            }
         }
        }
      }

      return new Response( json_encode($state));
    }


    #[Route('/userCheckIsLogin', name: 'api_user_check_isLogin')]
    public function checkUserLoginStateByEmail(Request $request){

      $state =[ 
        "connexionAllowed"=>false,
        "userRole"=>""
      ];

      $session =  $request->getSession();
      $parsedRequest = json_decode($request->getContent());

      if($session->isStarted() && $session->get("userEmail")){
        if(isset($parsedRequest->userEmail) &&   $session->get("userEmail") === $parsedRequest->userEmail){
          $state["connexionAllowed"] = true;
          $state["userRole"] = $session->get("userRole");
          $state["userEmail"] = $session->get("userEmail");
        }
      };
      return new Response(json_encode($state));
    }



 


}