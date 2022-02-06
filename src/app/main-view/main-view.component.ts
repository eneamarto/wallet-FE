import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../DTO/transaction";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from '@angular/common';
import {switchMap} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [TransactionService, DatePipe]
})
export class MainViewComponent implements OnInit {


  transactionList: Transaction[] = [];


  range: FormGroup;

  constructor(private transactionService: TransactionService, public datePipe: DatePipe, private fb: FormBuilder) {
    this.range = this.fb.group({
      start: [],
      end: []
    })
  }

  ngOnInit(): void {

    this.transactionService.showTransaction().subscribe(data => {

        data.forEach(x => this.transactionList.push(new Transaction(x.transactionType, x.transactionAmount, x.transactionDescription, x.transactionDate, x.transactionCategory.transactionCategoryName)));

      }
    );

    this.range.valueChanges.pipe(
        switchMap(form => {
          if (form.start && form.end) {
            const formattedStart = this.datePipe.transform(form.start, 'yyyy-MM-dd');
            const formattedEnd = this.datePipe.transform(form.end, 'yyyy-MM-dd');

            return this.transactionService.showTransaction(formattedStart, formattedEnd);
          }

          return EMPTY;
        })
    ).subscribe(
      data => {
        this.transactionList = [];
        data.forEach(x => this.transactionList.push(new Transaction(x.transactionType, x.transactionAmount, x.transactionDescription, x.transactionDate, x.transactionCategory.transactionCategoryName)));

      }
    )
  }

  resetForm() {

    this.range.reset();

    this.transactionList = [];

    this.transactionService.showTransaction().subscribe(data => {

        data.forEach(x => this.transactionList.push(new Transaction(x.transactionType, x.transactionAmount, x.transactionDescription, x.transactionDate, x.transactionCategory.transactionCategoryName)));

      }
    );

  }
}
