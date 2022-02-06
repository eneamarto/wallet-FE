import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionCategoryRequest} from "../DTO/transactionCategoryRequest";
import {TransactionCategoryService} from "../services/transaction-category.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @ViewChild("typeInput") typeInput: any;

  @ViewChild("nameInput") nameInput: any;

  name: string = '';
  type: string = '';


  constructor(private categoryService: TransactionCategoryService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  onSubmit() {

    this.type = this.typeInput.nativeElement.value.toLowerCase();

    this.name = this.nameInput.nativeElement.value;

    let newCategoryRequest = new TransactionCategoryRequest(this.type, this.name);

    this.categoryService.postTransactionCategory(newCategoryRequest);

    this.dialog.closeAll();

  }


  onClose() {
    this.dialog.closeAll();

  }
}
