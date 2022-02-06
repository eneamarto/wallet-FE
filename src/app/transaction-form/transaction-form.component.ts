import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TransactionCategoryService} from "../services/transaction-category.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ScanComponent} from "../scan/scan.component";
import {DatePipe} from "@angular/common";
import {TransactionCategoryResponse} from "../DTO/transactionCategoryResponse";
import {TransactionRequest} from "../DTO/transactionRequest";
import {TransactionService} from "../services/transaction.service";

export interface DialogData {
  category_id: number;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: [DatePipe]
})
export class TransactionFormComponent implements OnInit, AfterViewInit {

  categoryList: TransactionCategoryResponse[] = [];
  categoryHidden: boolean = true;

  date!: string;
  amount !: number;

  @ViewChild('numInput') numInput: any;
  @ViewChild('typeInput') typeInput: any;
  @ViewChild('dateInput') dateInput: any;
  categoryInput: any;


  constructor(private transactionCategoryService: TransactionCategoryService, public transactionService: TransactionService,
              public dialog: MatDialog, public datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  ngOnInit(): void {

    if (this.data != null) {

      this.typeSelected('expense');

      this.categoryInput = this.data.category_id;

    }
  }

  ngAfterViewInit() {

    if (this.data != null) {

      this.typeInput.nativeElement.value = 'expense';


    }
  }

  typeSelected(option: any) {

    this.categoryList = [];

    this.transactionCategoryService.showTransactionCategories(option).subscribe(data => {
        data.forEach(x => this.categoryList.push(new TransactionCategoryResponse(x.id, x.transactionCategoryName)))
      }
    );

    this.categoryHidden = false;
  }


  openScanDialog() {
    const dialogRef = this.dialog.open(ScanComponent, {
      data: {date: this.date, amount: this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.numInput.nativeElement.value = result.amount;

      this.typeInput.nativeElement.value = 'expense';

      this.typeSelected('expense');

      this.dateInput.nativeElement.value = <string>this.datePipe.transform(result.date, 'yyyy-MM-dd');

      this.categoryHidden = false;

    });
  }

  onSubmit() {

    let date = <string>this.datePipe.transform(this.dateInput.nativeElement.value, 'yyyy-MM-dd');

    let amount = this.numInput.nativeElement.value;

    let type = this.typeInput.nativeElement.value;

    let category = this.categoryInput;

    let description = '';

    let username = localStorage.getItem('username');

    let t = new TransactionRequest(type, amount, description, date, category, username);

    this.transactionService.postTransaction(t);

    this.dialog.closeAll();

  }
}
