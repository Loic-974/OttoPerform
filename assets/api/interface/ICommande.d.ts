import { IClient } from "./IClient";
import { IProduct } from "./IProduct";

/**
 * Order interface
 * Gather all order's information data
 */
export interface ICommande {
    /**
     * Order Id
     */
    id: number;
    /**
     * Order's client
     * Include all client informations data like name, firstName, sector, etc...
     */
    client: IClient;
    /**
     * Order's product
     * Include all product informations data like name, price, margin, etc...
     */
    produit: IProduct;
    /**
     * Order creation date
     * JS Date Object Format
     */
    date_creation: Date;
    /**
     * Order programmed shipping date
     * Must be ignitialized to null
     */
    date_livraison: Date;
    /**
     * order's product quantity
     */
    quantite: number;
    /**
     * Order's State
     * Only allow these values :  "En Attente" | "Livree" | "En Livraison" | "Annule"
     */
    statut: "En Attente" | "Livree" | "En Livraison" | "Annule";
    /**
     * Kind of order
     */
    type: string;
}
