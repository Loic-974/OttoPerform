<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_creation = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_livraison = null;

    #[ORM\Column]
    private ?int $quantite = null;

    #[ORM\Column(length: 64)]
    private ?string $statut = null;

    #[ORM\Column(length: 64)]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'commandes', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Client $id_client = null;

    #[ORM\ManyToOne(inversedBy: 'commandes', cascade: ['persist', 'remove']),]
    #[ORM\JoinColumn(nullable: false)]
    private ?Produit $id_produit = null;

    #[ORM\OneToOne(mappedBy: 'id_commande', cascade: ['persist', 'remove'])]
    private ?Livraison $livraison = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->date_creation;
    }

    public function setDateCreation(\DateTimeInterface $date_creation): self
    {
        $this->date_creation = $date_creation;

        return $this;
    }

    public function getDateLivraison(): ?\DateTimeInterface
    {
        return $this->date_livraison;
    }

    public function setDateLivraison(?\DateTimeInterface $date_livraison): self
    {
        $this->date_livraison = $date_livraison;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getIdClient(): ?Client
    {
        return $this->id_client;
    }

    public function setIdClient(?Client $id_client): self
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getIdProduit(): ?Produit
    {
        return $this->id_produit;
    }

    public function setIdProduit(?Produit $id_produit): self
    {
        $this->id_produit = $id_produit;

        return $this;
    }

    public function getLivraison(): ?Livraison
    {
        return $this->livraison;
    }

    public function setLivraison(Livraison $livraison): self
    {
        // set the owning side of the relation if necessary
        if ($livraison->getIdCommande() !== $this) {
            $livraison->setIdCommande($this);
        }

        $this->livraison = $livraison;

        return $this;
    }


    public function toJson(){
       return [
            "id"=>$this->getId(),
            "client"=>$this->getIdClient()->toJson(),
            "produit"=>$this->getIdProduit()->toJson(),
            "date_creation"=>$this->getDateCreation(),
            "date_livraison"=>$this->getDateLivraison(),
            "quantite"=>$this->getQuantite(),
            "statut"=>$this->getStatut(),
            "type"=>$this->getType(),
       ];
    }

}
