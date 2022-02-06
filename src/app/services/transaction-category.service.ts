import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionCategoryRequest} from "../DTO/transactionCategoryRequest";
import {GlobalConstants} from "../common/GlobalConstants";

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoryService {

  apiUrl: string = GlobalConstants.apiUrl;

  categoriesUrl: string = this.apiUrl + '/categories/';

  auth_headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private httpClient: HttpClient) {
  }

  showTransactionCategories(type: string): Observable<GetTransactionCategory[]> {

    return this.httpClient.get<GetTransactionCategory[]>(this.categoriesUrl + type);

  }

  postTransactionCategory(category: TransactionCategoryRequest) {

    let newCategory: string = JSON.stringify(category);

    console.log(newCategory);

    this.httpClient.post(this.categoriesUrl, newCategory, {headers: this.auth_headers}).subscribe();

  }


}

interface GetTransactionCategory {

  "id": number,
  "transactionCategoryType": string,
  "transactionCategoryName": string

}
