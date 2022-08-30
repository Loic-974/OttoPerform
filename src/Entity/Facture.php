<?php

namespace App\Entity;

use App\Repository\FactureRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FactureRepository::class)]
class Facture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    private ?string $statut = null;

    #[ORM\Column]
    private ?int $echu_delay = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $echu_date = null;

    #[ORM\Column]
    private ?int $montant = null;

    #[ORM\Column]
    private ?int $tva = null;

    #[ORM\OneToOne(inversedBy: 'facture', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Livraison $id_livraison = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEchuDelay(): ?int
    {
        return $this->echu_delay;
    }

    public function setEchuDelay(int $echu_delay): self
    {
        $this->echu_delay = $echu_delay;

        return $this;
    }

    public function getEchuDate(): ?\DateTimeInterface
    {
        return $this->echu_date;
    }

    public function setEchuDate(\DateTimeInterface $echu_date): self
    {
        $this->echu_date = $echu_date;

        return $this;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getTva(): ?int
    {
        return $this->tva;
    }

    public function setTva(int $tva): self
    {
        $this->tva = $tva;

        return $this;
    }

    public function getIdLivraison(): ?Livraison
    {
        return $this->id_livraison;
    }

    public function setIdLivraison(Livraison $id_livraison): self
    {
        $this->id_livraison = $id_livraison;

        return $this;
    }
}
