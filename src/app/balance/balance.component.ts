import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  balance?: number;
  income?: number;
  expenses?: number;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {

    this.transactionService.showBalance().subscribe((data) => {

      this.balance = data.balance;
      this.income = data.income;
      this.expenses = data.expenses;

    });

  }

}
