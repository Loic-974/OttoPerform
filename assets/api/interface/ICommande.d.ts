import { IClient } from "./IClient";
import { IProduct } from "./IProduct";

export interface ICommande {
    id: number;
    client: IClient;
    produit: IProduct;
    date_creation: Date;
    date_livraison: Date;
    quantite: number;
    statut: "En Attente" | "Livree" | "En Livraison" | "Annule";
    type: string;
}
