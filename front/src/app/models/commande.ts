import { Produit } from "./produit";
import { Status } from './status';

export class Commande {
    id: any;
    produitIds: number[]; // Utilisation d'un tableau de nombres pour les IDs des produits
    totalAchat: number;
    quantite: number;
    status: Status;

    constructor(produits: Produit[], totalAchat: number, quantite: number, status: Status) {
        // Initialisation des valeurs
        this.produitIds = produits.map(produit => produit.id);
        this.totalAchat = totalAchat;
        this.quantite = quantite;
        this.status = status;
    }
}
