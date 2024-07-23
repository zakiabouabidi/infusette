// PanierComponent.ts

import { Component, Inject, OnInit } from '@angular/core';
import { Commande } from '../models/commande';
import { Produit } from '../models/produit';
import { PanierService } from '../services/panier.service';
import { CommandeService } from '../services/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Produit[] = [];

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private router: Router,
     @Inject('baseURL') public baseURL: any
  ) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanierItems();
  }

  removeFromPanier(id: number) {
    this.panierService.removeFromPanier(id);
    this.panier = this.panierService.getPanierItems();
  }

  getTotalPanier(): number {
    return this.panierService.getTotalPanier();
  }

  clearPanier() {
    this.panierService.clearPanier();
    this.panier = [];
  }

  confirmCommande() {
    const commande = new Commande(
      this.panier,
      this.getTotalPanier(),
      this.panier.reduce((sum, produit) => sum + produit.quantite, 0),
      'EN_ATTENTE'
    );

    this.commandeService.confirmerCommande(commande).subscribe(
      (response) => {
        console.log('Commande confirmée avec succès', response);
        this.clearPanier();

        // Redirection vers la page de détail de la commande (si nécessaire)
        this.router.navigate(['/commandes', response.id]);
      },
      (error) => {
        console.error('Erreur lors de la confirmation de la commande', error);
        // Gérer les erreurs ici si nécessaire
      }
    );
  }
}
