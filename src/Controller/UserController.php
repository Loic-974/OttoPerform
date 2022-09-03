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

    
    #[Route('/userAdd', name: 'api_user_add')]

    public function userAdd(Request $request){

      var_dump(json_decode($request->getContent()));
      return new Response();
    }
}
