import { ILivraison } from "./ILivraison";
import { ISecteur } from "./ISecteur";

export interface ILivreur {
    id: number;
    nom: string;
    prenom: string;
    secteur: ISecteur;
    livraisons?: ILivraison[];
}
