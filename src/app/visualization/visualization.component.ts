import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../services/transaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {DatePipe} from "@angular/common";
import {TransactionStatisticsRequest} from "../DTO/transactionStatisticsRequest";
import * as moment from 'moment';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  providers: [TransactionService, DatePipe]

})
export class VisualizationComponent implements OnInit {

  dateFormat: string = 'yyyy-MM-dd';

  range: FormGroup;

  colorScheme = {
    domain: [
      '#CCFF90',
      '#FF8A80',
      '#8C9EFF',
      '#80D8FF',
      '#A7FFEB',
      '#FFFF8D',
      '#FF9E80'
    ]
  };
  saleData: any [] = [];
  today = moment().format("yyyy-MM-DD");
  priorDate = moment(moment().subtract(30, 'days')).format("yyyy-MM-DD");

  statisticsRequest = new TransactionStatisticsRequest(this.priorDate, this.today);
  isChecked: boolean = false;

  multi: any[] = [];


  constructor(private transactionService: TransactionService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.range = this.fb.group({
      start: [],
      end: []
    })
  }

  formatDate(date: Date): String | null {

    return this.datePipe.transform(date, this.dateFormat);

  }

  ngOnInit(): void {


    this.transactionService.showBalanceHistory().subscribe(data => {

      let resultList = JSON.parse(data);

      this.multi = [
        {
          name: "Balance",
          series: resultList
        }
      ];

    });


    this.transactionService.showTransactionStatistics(this.statisticsRequest).subscribe(data => {

      let d = JSON.parse(data);

      let resultList: any[] = Object.entries(d).map(([name, value]) => ({name, value}));

      this.saleData = resultList;

    });


    this.range.valueChanges.pipe(
      switchMap(form => {
        if (form.start && form.end) {

          const formattedStart = this.formatDate(form.start);
          const formattedEnd = this.formatDate(form.end);

          // @ts-ignore
          this.statisticsRequest = new TransactionStatisticsRequest(formattedStart, formattedEnd);

          return this.transactionService.showTransactionStatistics(this.statisticsRequest);
        }

        return EMPTY;
      })
    ).subscribe(data => {

      let d = JSON.parse(data);

      let resultList: any[] = Object.entries(d).map(([name, value]) => ({name, value}));

      this.saleData = resultList;

    });

  }

  resetForm() {

    this.range.reset();

    this.statisticsRequest = new TransactionStatisticsRequest(this.priorDate, this.today);

    this.transactionService.showTransactionStatistics(this.statisticsRequest).subscribe(data => {

      let d = JSON.parse(data);

      let resultList: any[] = Object.entries(d).map(([name, value]) => ({name, value}));

      this.saleData = resultList;

    });
  }
}






