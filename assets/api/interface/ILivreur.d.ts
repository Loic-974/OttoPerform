import { ILivraison } from "./ILivraison";
import { ISecteur } from "./ISecteur";

export interface ILivreur {
    id: number;
    nom: string;
    secteur: ISecteur;
    livraisons?: ILivraison[];
}
