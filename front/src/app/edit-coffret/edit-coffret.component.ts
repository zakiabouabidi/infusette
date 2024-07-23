import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoffretService } from '../services/coffret.service';
import { Coffret } from '../models/coffret';
import { Produit } from '../models/produit';
import { ProduitsService } from '../services/produits.service';
@Component({
  selector: 'app-edit-coffret',
  templateUrl: './edit-coffret.component.html',
  styleUrls: ['./edit-coffret.component.css']
})
export class EditCoffretComponent {
  coffret: Coffret = { id: 0, nom: '', prix: 0, quantite: 0, produitIds: [] };
  produits: Produit[] = [];
  selectedProduits: Produit[] = [];
  isEditMode: boolean = false;
  isWaiting: boolean = false;
  errMsg!: string;
  private routeSub!: Subscription;
  private produitSub!: Subscription;

  constructor(
    private coffretService: CoffretService,
    private produitService: ProduitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id === -1) {
        this.isEditMode = false;
      } else {
        this.isEditMode = true;
        this.loadCoffret(id);
      }
    });

    this.produitSub = this.produitService.getAllProduits().subscribe({
      next: produits => this.produits = produits,
      error: err => this.errMsg = err
    });
  }

  loadCoffret(id: number): void {
    this.isWaiting = true;
    this.coffretService.getCoffretById(id).subscribe({
      next: coffret => {
        this.coffret = coffret;
        this.selectedProduits = this.produits.filter(produit => this.coffret.produitIds.includes(produit.id));
        this.isWaiting = false;
      },
      error: err => {
        this.errMsg = err;
        this.isWaiting = false;
      }
    });
  }

  saveCoffret(): void {
    this.isWaiting = true;
    if (this.isEditMode) {
      this.coffretService.updateCoffret(this.coffret.id, this.coffret).subscribe({
        next: () => this.router.navigate(['/coffrets']),
        error: err => {
          this.errMsg = err;
          this.isWaiting = false;
        }
      });
    } else {
      this.coffretService.addCoffret(this.coffret).subscribe({
        next: () => this.router.navigate(['/coffrets']),
        error: err => {
          this.errMsg = err;
          this.isWaiting = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.produitSub.unsubscribe();
  }
}

