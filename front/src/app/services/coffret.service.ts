import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coffret } from '../models/coffret';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CoffretService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHttpmsgService,
              @Inject('baseURL') private baseURL: any) { }

  getAllCoffrets(): Observable<Coffret[]> {
    return this.http.get<Coffret[]>(this.baseURL + "coffrets", { withCredentials: true })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCoffretById(id: number): Observable<Coffret> {
    return this.http.get<Coffret>(this.baseURL + "coffrets/" + id, { withCredentials: true })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addCoffret(coffret: Coffret): Observable<Coffret> {
    return this.http.post<Coffret>(this.baseURL + "coffrets", coffret, this.httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  updateCoffret(id: number, coffret: Coffret): Observable<Coffret> {
    return this.http.put<Coffret>(this.baseURL + "coffrets/" + coffret.id, coffret, this.httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteCoffret(id: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + "coffrets/" + id, { withCredentials: true })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
