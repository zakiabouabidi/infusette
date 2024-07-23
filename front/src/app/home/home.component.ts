import { Component, Inject, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { ProduitsService } from '../services/produits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories:Categorie[]=[];
  categorie:Categorie|undefined;
  idCategorie:any;
  produits:Produit[]=[ ];
  produit:Produit|undefined;
   idProduit:any;
  constructor(private router:Router, 
    private produitService : ProduitsService, 
    private categorieService: CategorieService,
    private panierService: PanierService,
    private route:ActivatedRoute,@Inject('baseURL') 
    public baseURL:any
   ){}
  
  ngOnInit(): void {
    //sans backend 
    //this.produits=this.produitService.getAllProduits();
   this.produitService.getAllProduits().subscribe({
    next:(produits:Produit[])=>{this.produits=produits}
   })
     this.idProduit= this.route.snapshot.params['id'];

     this.categorieService.getAllCategories().subscribe({
      next:(categories:Categorie[])=>{this.categories=categories}
     })
    this.idCategorie= this.route.snapshot.params['id'];
  } 

  addToPanier(produit: Produit) {
    this.panierService.addToPanier(produit);
   
  }
      }

 
  
 
 
  
