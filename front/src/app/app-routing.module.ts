import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { AproposComponent } from './apropos/apropos.component';
import { CoffretComponent } from './coffret/coffret.component';
import { EditCoffretComponent } from './edit-coffret/edit-coffret.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  
  //{path:'',canActivate:[authGuard],component:HomeComponent},
  { path: 'a-propos', component: AproposComponent },
  {path:'produits', component:ProduitsComponent},
  {path:'produits/edit',  component:EditProduitComponent},
   { path: 'produits/panier',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']},  component: PanierComponent }, // Ajoutez cette ligne pour le composant PanierComponent
 {path:'produits/edit/:id', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component:EditProduitComponent},
  {path:'produits/:id',  component: DetailProduitComponent},
  { path: 'coffrets', component: CoffretComponent },
  { path: 'coffrets/edit/:id', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component: EditCoffretComponent },
  {path:'categories', component:CategorieComponent},
  {path:'categories/edit',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component:EditCategorieComponent},
  {path:'categories/edit/:id',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component:EditCategorieComponent},
  { path: 'categories/:id',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']},  component: DetailCategorieComponent },
  {path:'commandes',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component:CommandeComponent}, 
  {path:'admin', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:AdminComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'**', component:NotfoundComponent}
  // {path:'',redirectTo:'/produits',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
