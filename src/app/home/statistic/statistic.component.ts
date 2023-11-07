import { Component, Input, OnInit } from '@angular/core';
import { SaleAndPurcharse } from 'src/app/model/sale-and-purcharse';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  date: any;
  currentDate!: string | number | Date;

  @Input("totalData")public totalData!: SaleAndPurcharse;
 
  constructor() { }
  ngOnInit(): void {
    this.currentDate = new Date()
  }

}
