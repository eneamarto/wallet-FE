export class Transaction{


  constructor(public transactionType:string, public transactionAmount:number, public transactionDescription:string,
              public transactionDate:string, public transactionCategoryName:string) {
  }

}
