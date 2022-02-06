import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {TransactionFormComponent} from "../transaction-form/transaction-form.component";

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

  categories: any = [{
    id: 2,
    type: "Bills",
    photo: "/assets/bill.png",
  }, {
    id: 3,
    type: "Food",
    photo: "/assets/food.png",
  }, {
    id: 4,
    type: "Entertainment",
    photo: "/assets/entertainment.png",
  }, {
    id: 5,
    type: "Clothing",
    photo: "/assets/clothes.png",
  }
  ]

  constructor(public dialog: MatDialog) {
  }

  createTransaction(id: number) {

    this.dialog.open(TransactionFormComponent, {data: {category_id: id}});


  }

  openDialog() {

    this.dialog.open(CategoryFormComponent);
  }
}
