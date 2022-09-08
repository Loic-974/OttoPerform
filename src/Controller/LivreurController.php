<?php

namespace App\Controller;

use App\Repository\LivreurRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/livreur', name: 'app_livreur')]
class LivreurController extends AbstractController
{

    private $manager;


    public function  __construct(ManagerRegistry $manager){
        $this->manager = $manager;
    }

    #[Route('/getAllLivreur', name: 'app_livreur_getAll')]
    public function getAllLivreur(){

        $livreurRepo = new LivreurRepository($this->manager);

        $allLivreurs = $livreurRepo->findAll();

        $result = array_map(fn($livreur) => $livreur->toJson(),  $allLivreurs);

        return new Response(json_encode($result));

    }
}
