import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = GlobalConstants.apiUrl;

  constructor(private httpClient:HttpClient) { }


  signIn(credentials:any){

    return this.httpClient.post<any>(this.apiUrl + '/auth/signIn', credentials);

  }

}
