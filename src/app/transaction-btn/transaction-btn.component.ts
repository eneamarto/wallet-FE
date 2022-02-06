import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TransactionFormComponent} from "../transaction-form/transaction-form.component";

@Component({
  selector: 'app-transaction-btn',
  templateUrl: './transaction-btn.component.html',
  styleUrls: ['./transaction-btn.component.css']
})
export class TransactionBtnComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {

    this.dialog.open(TransactionFormComponent);

  }
}
