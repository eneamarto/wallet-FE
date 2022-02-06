export class TransactionRequest {


  constructor(public transactionType: string, public transactionAmount: number, public transactionDescription: string,
              public transactionDate: string, public transactionCategoryId: number, public transactionUsername: string | null) {
  }

}
