import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TransactionRequest} from "../DTO/transactionRequest";
import {TransactionStatisticsRequest} from "../DTO/transactionStatisticsRequest";
import {GlobalConstants} from "../common/GlobalConstants";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl: string = GlobalConstants.apiUrl;


  transactionUrl: string = this.apiUrl + '/transactions/';

  transactionStatisticsUrl: string = this.apiUrl + '/transaction_stats/';

  balanceUrl: string = this.apiUrl + "/balance/";

  balanceHistoryUrl: string = this.apiUrl + "/balance_history/";

  auth_headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private httpClient: HttpClient) {
  }


  showTransaction(startDate: string | null = '', endDate: string | null = ''): Observable<TransactionResponse[]> {

    if (startDate == '' || endDate == '') {
      return this.httpClient.get<TransactionResponse[]>(this.transactionUrl);
    } else {
      return this.httpClient.get<TransactionResponse[]>(this.transactionUrl + startDate + '_' + endDate);
    }

  }

  showTransactionStatistics(statisticsRequest: TransactionStatisticsRequest): Observable<string> {

    let body = JSON.stringify(statisticsRequest);

    return this.httpClient.post<TransactionStatisticsRequest>(this.transactionStatisticsUrl, body, {headers: this.auth_headers}).pipe(map(x => JSON.stringify(x)));

  }


  postTransaction(transaction: TransactionRequest) {

    let body = JSON.stringify(transaction);

    return this.httpClient.post<TransactionRequest>(this.transactionUrl, body, {headers: this.auth_headers}).subscribe((data) => data);

  }

  showBalance(): Observable<BalanceResponse> {

    return this.httpClient.get<BalanceResponse>(this.balanceUrl);

  }

  showBalanceHistory(): Observable<string> {

    return this.httpClient.get<DataPoint[]>(this.balanceHistoryUrl).pipe(map(x => JSON.stringify(x)));

  }
}

export interface DataPoint {

  name: string;
  value: number;

}

export interface TransactionCategory {
  id: number;
  transactionCategoryType: string;
  transactionCategoryName: string;
}

export interface TransactionUser {
  id: number;
  password: string;
  userBalance: number;
}

export interface TransactionResponse {
  id: number;
  transactionType: string;
  transactionAmount: number;
  transactionDescription: string;
  transactionDate: string;
  transactionCategory: TransactionCategory;
  transactionUser: TransactionUser;
}

export interface BalanceResponse {

  balance: number;
  income: number;
  expenses: number;
}
