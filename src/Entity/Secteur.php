<?php

namespace App\Entity;

use App\Repository\SecteurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SecteurRepository::class)]
class Secteur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\Column(length: 45)]
    private ?string $nom_secteur = null;

    #[ORM\Column(length: 128)]
    private ?string $gestionnaire = null;

    #[ORM\OneToMany(mappedBy: 'id_secteur', targetEntity: Livreur::class, orphanRemoval: true)]
    private Collection $livreurs;

    #[ORM\OneToMany(mappedBy: 'id_secteur', targetEntity: Client::class, orphanRemoval: true)]
    private Collection $clients;

    public function __construct()
    {
        $this->livreurs = new ArrayCollection();
        $this->clients = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomSecteur(): ?string
    {
        return $this->nom_secteur;
    }

    public function setNomSecteur(string $nom_secteur): self
    {
        $this->nom_secteur = $nom_secteur;

        return $this;
    }

    public function getGestionnaire(): ?string
    {
        return $this->gestionnaire;
    }

    public function setGestionnaire(string $gestionnaire): self
    {
        $this->gestionnaire = $gestionnaire;

        return $this;
    }

    /**
     * @return Collection<int, Livreur>
     */
    public function getLivreurs(): Collection
    {
        return $this->livreurs;
    }

    public function addLivreur(Livreur $livreur): self
    {
        if (!$this->livreurs->contains($livreur)) {
            $this->livreurs->add($livreur);
            $livreur->setIdSecteur($this);
        }

        return $this;
    }

    public function removeLivreur(Livreur $livreur): self
    {
        if ($this->livreurs->removeElement($livreur)) {
            // set the owning side to null (unless already changed)
            if ($livreur->getIdSecteur() === $this) {
                $livreur->setIdSecteur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Client>
     */
    public function getClients(): Collection
    {
        return $this->clients;
    }

    public function addClient(Client $client): self
    {
        if (!$this->clients->contains($client)) {
            $this->clients->add($client);
            $client->setIdSecteur($this);
        }

        return $this;
    }

    public function removeClient(Client $client): self
    {
        if ($this->clients->removeElement($client)) {
            // set the owning side to null (unless already changed)
            if ($client->getIdSecteur() === $this) {
                $client->setIdSecteur(null);
            }
        }

        return $this;
    }

    public function toJson(){
        return [
            "id"=>$this->getId(),
            "nom_secteur"=>$this->getNomSecteur(),
            "gestionnaire"=>$this->getGestionnaire(),
        ];
    }
}
