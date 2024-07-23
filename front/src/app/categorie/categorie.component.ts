import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit ,OnDestroy{

categories!:Categorie[];
categorie:Categorie|undefined;
idCategorie:any;
errMsg!:string;
isWaiting:boolean=true;
isWaitingDelete: boolean = false;
  // Shows admin functions if user has admin role
  showAdminFn = false;
  authUserSub!: Subscription; // Subscription to the authenticated user observable
  constructor(private router:Router,
  private categorieService: CategorieService,
  private authService: AuthService,
  private route:ActivatedRoute,@Inject('baseURL') public baseURL:any){}

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe({
      next:(categories:Categorie[])=>{this.categories=categories;this.isWaiting=false; this.errMsg=""},
      error:(err)=>{this.categories=[],this.isWaiting=false, this.errMsg=err}
     })
    this.idCategorie= this.route.snapshot.params['id'];
    this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If user is authenticated
        if (user) {
          // Show admin Fn if user has admin role
          this.showAdminFn = user.role.name === 'ROLE_ADMIN';
          console.log(this.showAdminFn);

        } else {
          this.showAdminFn = false;
        }
      }
    })
  } 

  onAddCategorie() {
    this.router.navigateByUrl('/categories/edit/-1')
  }

  delateCategorie(id:number){
    this.isWaitingDelete = true
    this.categorieService.delateCategorie(id).subscribe(
     {
       next:(res:any)=>
         { this.isWaitingDelete = false
           let index=this.categories.findIndex(categorie=>categorie.id===id);
           if(index !=-1){
             this.categories.splice(index,1);
           }
         }
     } );
   }
   confirmDelete(id: number): void {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");

    if (confirmDelete) {
      this.delateCategorie(id);
    }
  }
  onAddProduit() {
    this.router.navigateByUrl('/produits/edit')
  }
  ngOnDestroy(): void {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    this.authUserSub.unsubscribe();
   }
}
