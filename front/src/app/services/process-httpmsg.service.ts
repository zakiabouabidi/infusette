import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor() { }

  handleError(error:HttpErrorResponse|any){
    let errMsg:string;
    //error side client
    if(error.error instanceof ErrorEvent){
      errMsg=error.error.message
    }else{
      //server side error
      errMsg=`Une erreur s'est produite avec le serveur JSON. Veuillez réessayer plus tard ${error.message|| ''}`
    }
    return throwError(()=>errMsg)
  }
}
