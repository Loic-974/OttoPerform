<?php

namespace App\Repository;

use App\Entity\Client;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Client>
 *
 * @method Client|null find($id, $lockMode = null, $lockVersion = null)
 * @method Client|null findOneBy(array $criteria, array $orderBy = null)
 * @method Client[]    findAll()
 * @method Client[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Client::class);
    }

    public function add(Client $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Client $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


  
      /**
     * Find a Client by Field Id
     * @param string $value
     * @return Client|null
     */
    public function findOneClientById($value): ?Client
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id= :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

//    /**
//     * @return Client[] Returns an array of Client objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    /**
     * Find a Client by Field Name
     * @param string $field
     * @param string $value
     * @return Client|null
     */
   public function findOneClientByField($field,$value): ?Client
   {
       return $this->createQueryBuilder('c')
           ->andWhere($field = ':val')
           ->setParameter('val', $value)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }


   public function findExistingClient($nom, $prenom, $adresse, $codeP,$ville): ?Client
   {
       return $this->createQueryBuilder('c')
           ->andwhere('c.nom = :nom')
           ->andWhere('c.prenom = :prenom')
           ->andWhere('c.adresse = :adresse')
           ->andWhere('c.codePostal = :codeP')
           ->andWhere('c.ville = :ville')
           ->setParameter('nom', $nom)
           ->setParameter('prenom', $prenom)
           ->setParameter('adresse', $adresse)
           ->setParameter('codeP', $codeP)
           ->setParameter('ville', $ville)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }
}
