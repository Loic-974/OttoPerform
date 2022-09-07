import { ISecteur } from "./ISecteur";
export interface IClient {
    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    secteur: ISecteur;
}
