<?php

namespace App\Controller;

use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/product', name: 'app_produit')]
class ProduitController extends AbstractController
{
    
    private $manager;

    public function __construct(ManagerRegistry $manager){

        $this->manager = $manager;

    }


    #[Route('/getProductList', name: 'app_produit_getProductList')]
    public function getAllProduct(){

        $productRepo = new ProduitRepository($this->manager);
        $productList = $productRepo->findAll();
        $result = [];
        foreach($productList as $product){
            array_push($result,$product->toJson());
        }
        return new Response(json_encode($result));

    }

}
