import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coffret } from '../models/coffret';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';
import { CoffretService } from '../services/coffret.service';
import { AuthService } from '../services/auth.service';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-coffret',
  templateUrl: './coffret.component.html',
  styleUrls: ['./coffret.component.css']
})
export class CoffretComponent implements OnInit, OnDestroy {

  coffrets!: Coffret[];
  produits!: Produit[];
  coffret: Coffret | undefined;
  selectedCoffretProducts!: Produit[];
  errMsg!: string;
  isWaiting: boolean = true;
  isWaitingDelete: boolean = false;
  showAdminFn = false;
  authUserSub!: Subscription;

  constructor(private router: Router,
              private coffretService: CoffretService,
              private produitService: ProduitsService,
              private authService: AuthService,
              @Inject('baseURL') public baseURL: any) { }

  ngOnInit(): void {
    this.loadProduits();
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

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
        this.loadCoffrets();
      },
      error: (err) => {
        this.errMsg = err;
      }
    });
  }

  loadCoffrets(): void {
    this.isWaiting = true;
    this.coffretService.getAllCoffrets().subscribe({
      next: (coffrets: Coffret[]) => {
        this.coffrets = coffrets;
        this.isWaiting = false;
        this.errMsg = "";
        // Display products of the first Coffret by default
        if (this.coffrets.length > 0) {
          this.viewCoffretProducts(this.coffrets[0]);
        }
      },
      error: (err) => {
        this.coffrets = [];
        this.isWaiting = false;
        this.errMsg = err;
      }
    });
  }

  viewCoffretProducts(coffret: Coffret): void {
    this.selectedCoffretProducts = this.produits.filter(produit => coffret.produitIds.includes(produit.id));
  }

  getProductNames(produitIds: number[]): string[] {
    return this.produits.filter(produit => produitIds.includes(produit.id)).map(produit => produit.name);
  }

  deleteCoffret(id: number): void {
    this.isWaitingDelete = true;
    this.coffretService.deleteCoffret(id).subscribe({
      next: (res: any) => {
        this.isWaitingDelete = false;
        let index = this.coffrets.findIndex(coffret => coffret.id === id);
        if (index !== -1) {
          this.coffrets.splice(index, 1);
        }
      }
    });
  }

  onAddCoffret(): void {
    this.router.navigateByUrl('/coffrets/edit/-1');
  }

  confirmDelete(id: number): void {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce coffret ?");
    if (confirmDelete) {
      this.deleteCoffret(id);
    }
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}