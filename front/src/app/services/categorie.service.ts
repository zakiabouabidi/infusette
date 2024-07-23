import { Inject, Injectable, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  //private baseUtRL = 'http://localhost:3000/api/categories';
  constructor(private http:HttpClient, @Inject('baseURL') public baseURL:any,
  private processHTTPMsgService : ProcessHttpmsgService) { }
 
  categories:Categorie[]=[];
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
    withCredentials: true
  };
  
  
  getAllCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.baseURL+"categories",{ withCredentials: true}).pipe
    (catchError(this.processHTTPMsgService.handleError));
  }
    
  getCategorieById(id:number):Observable<Categorie>{
    return this.http.get<Categorie>(this.baseURL+"categories/"+id,{ withCredentials: true})
  }
addonAddCategorie(categorie:Categorie):Observable<Categorie>{
 
  return this.http.post<Categorie>(this.baseURL+"categories",categorie,this.httpOptions)
}


updateCategorie(categorie:Categorie):Observable<Categorie>{
 
  return this.http.put<Categorie>(this.baseURL+"categories/"+categorie.id,categorie,this.httpOptions)
}

  // delateCategorie(id:number):Observable<any>{
  //   return this.http.delete<any>(`${this.baseURL}/${id}`);
  //   }
    delateCategorie(id:number):Observable<any>{
      return this.http.delete<any>(this.baseURL+"categories/"+id,{ withCredentials: true})
    }
}
