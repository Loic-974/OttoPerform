import { ICommande } from "./ICommande";
import { ILivreur } from "./ILivreur";

export interface ILivraison {
    commande: ICommande;
    date_livraison: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    id: number;
    livreur?: ILivreur;
    shipped_date: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
}
