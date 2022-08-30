<?php

namespace App\Entity;

use App\Repository\LivraisonRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LivraisonRepository::class)]
class Livraison
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_livraison = null;

    #[ORM\ManyToOne(inversedBy: 'livraisons')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Livreur $id_livreur = null;


    #[ORM\OneToOne(mappedBy: 'id_livraison', cascade: ['persist', 'remove'])]
    private ?Facture $facture = null;

    #[ORM\OneToOne(inversedBy: 'livraison', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Commande $id_commande = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateLivraison(): ?\DateTimeInterface
    {
        return $this->date_livraison;
    }

    public function setDateLivraison(\DateTimeInterface $date_livraison): self
    {
        $this->date_livraison = $date_livraison;

        return $this;
    }

    public function getIdLivreur(): ?Livreur
    {
        return $this->id_livreur;
    }

    public function setIdLivreur(?Livreur $id_livreur): self
    {
        $this->id_livreur = $id_livreur;

        return $this;
    }


    public function getFacture(): ?Facture
    {
        return $this->facture;
    }

    public function setFacture(Facture $facture): self
    {
        // set the owning side of the relation if necessary
        if ($facture->getIdLivraison() !== $this) {
            $facture->setIdLivraison($this);
        }

        $this->facture = $facture;

        return $this;
    }

    public function getIdCommande(): ?Commande
    {
        return $this->id_commande;
    }

    public function setIdCommande(Commande $id_commande): self
    {
        $this->id_commande = $id_commande;

        return $this;
    }
}
