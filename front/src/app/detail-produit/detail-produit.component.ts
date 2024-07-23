import { Component, Inject, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { ProduitsService } from '../services/produits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  produit: Produit | undefined;
  idContact: any;
  errName: string="";
// Utiliser ActivatedRoute pour obtenir les paramètres d'URL 
  constructor(private produitService: ProduitsService,
    private panierService: PanierService,
    private router: Router,private route: ActivatedRoute ,@Inject('baseURL') public baseURL:any) { }
  ngOnInit(): void {
    // Récupérer l'ID du paramètre d'URL
    this.route.paramMap.subscribe(params => {
      this.idContact =params.get('id'); 
      this.produitService.getProduitById(this.idContact).subscribe(
        (produit)=>{this.produit=produit }

         )    });
  }


  
  onAddProduit() {
    this.router.navigateByUrl('/produits/edit')
  }
  addToPanier(produit: Produit) {
    this.panierService.addToPanier(produit);
   
  }
}
