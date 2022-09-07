<?php

namespace App\Controller;

use App\Repository\ClientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;


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

    

}
