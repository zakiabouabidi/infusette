

import { Inject, Injectable } from '@angular/core';
import { Produit } from '../models/produit';
import { Categorie } from '../models/categorie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
    withCredentials: true
  };
  produits: Produit[] = [ ];
  constructor(private http:HttpClient,
    private processHTTPMsgService : ProcessHttpmsgService,
     @Inject('baseURL') public baseURL:any
     ) { }
  

//sans back
  // getAllProduits():Produit[]{
  //   return this.produits;
  // }

  getAllProduits():Observable<Produit[]>{
    return this.http.get<Produit[]>(this.baseURL+"produits",{ withCredentials: true}).pipe
    (catchError(this.processHTTPMsgService.handleError));
  }
    
  getProduitById(id:number):Observable<Produit>{
    return this.http.get<Produit>(this.baseURL+"produits/"+id,{ withCredentials: true})
  }

  

  addonAddProduit(produit:Produit):Observable<Produit>{
    
    return this.http.post<Produit>(this.baseURL+"produits",produit,this.httpOptions)
  }

  updateProduit(produit:Produit):Observable<Produit>{
 
    return this.http.put<Produit>(this.baseURL+"produits/"+produit.id,produit,this.httpOptions)
  }

  delateProduit(id:number):Observable<any>{
    return this.http.delete<any>(this.baseURL+"produits/"+id,{ withCredentials: true})
  }

  
  getProduitsByCategorie(idcat: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseURL}produits/categorie/${idcat}`, { withCredentials: true })
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  
}


