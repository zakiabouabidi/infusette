import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../models/produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../models/categorie';
import { PanierService } from '../services/panier.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit, OnDestroy {
  produits!: Produit[];
  categories!: Categorie[];
  produit: Produit | undefined;
  idProduit: any;
  errMsg!: string;
  isWaiting: boolean = true;
  isWaitingDelete: boolean = false;
  showAdminFn = false;
  authUserSub!: Subscription; // Subscription to the authenticated user observable

  constructor(
    private router: Router,
    private produitService: ProduitsService,
    private categorieService: CategorieService,
    private panierService: PanierService,
    private authService: AuthService,
    private route: ActivatedRoute,
    @Inject('baseURL') public baseURL: any
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.authUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        if (user) {
          this.showAdminFn = user.role.name === 'ROLE_ADMIN';
        } else {
          this.showAdminFn = false;
        }
      }
    });
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories;
        // Load products of the first category by default
        if (this.categories.length > 0) {
          this.filterByCategory(this.categories[0].id);
        }
      },
      error: (err) => {
        this.errMsg = err;
      }
    });
  }

  
  filterByCategory(idcat: number): void {
    this.isWaiting = true;
    this.produitService.getProduitsByCategorie(idcat).subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
        this.isWaiting = false;
        this.errMsg = "";
      },
      error: (err) => {
        this.produits = [];
        this.isWaiting = false;
        this.errMsg = err;
      }
    });
  }

  delateProduit(id: number): void {
    this.isWaitingDelete = true;
    this.produitService.delateProduit(id).subscribe({
      next: (res: any) => {
        this.isWaitingDelete = false;
        let index = this.produits.findIndex(produit => produit.id === id);
        if (index !== -1) {
          this.produits.splice(index, 1);
        }
      }
    });
  }

  onAddProduit(): void {
    this.router.navigateByUrl('/produits/edit/-1');
  }

  confirmDelete(id: number): void {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
    if (confirmDelete) {
      this.delateProduit(id);
    }
  }

  onCategorie(): void {
    this.router.navigate(['/categories', { name: 'cake fraise' }]);
  }

  addToPanier(produit: Produit): void {
    this.panierService.addToPanier(produit);
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}
