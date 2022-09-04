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
      $parsedRequest = json_decode($request->getContent());
      $email = $parsedRequest->userEmail;
      $password =  $parsedRequest->password;

      $state =[ 
        "connexionAllowed"=>false,
        "userRole"=>""
      ];
     
      if(is_string($email) && is_string($password) && !isEmpty($email) &&!isEmpty( $password) ){

        $userRepo = new UserRepository( $this->managerRegistry);

        $user =  $userRepo->findByEmail($email);
        if( $user && $user->getPassword()==$password) {

          $session = new Session();
          $session->start();

          $session->set('userName', $user->getPrenom());
          $session->set('userEmail', $user->getEmail());
          $session->set('userRole', $user->getRole());

          $state["connexionAllowed"] = true;
          $state["userRole"] = $user->getRole();
        }
      }

      return new Response( json_encode($state));
    }







    private function isExpertOrAdmin(User $user):bool{
      $role = $user->getRole();
      return ($role == "expert" || $role== "admin");

    }

}
