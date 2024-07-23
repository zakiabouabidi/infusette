import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { BaseURL } from './models/baseUrl';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AproposComponent } from './apropos/apropos.component';
import { CoffretComponent } from './coffret/coffret.component';
import { EditCoffretComponent } from './edit-coffret/edit-coffret.component';
import { DetailCoffretComponent } from './detail-coffret/detail-coffret.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    CategorieComponent,
    HomeComponent,
    SigninComponent,
    NotfoundComponent,
    EditProduitComponent,
    EditCategorieComponent,
    DetailProduitComponent,
    DetailCategorieComponent,
    PanierComponent,
    CommandeComponent,
    SignupComponent,
    AdminComponent,
    AproposComponent,
    CoffretComponent,
    EditCoffretComponent,
    DetailCoffretComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
   { provide:'baseURL', useValue:BaseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
