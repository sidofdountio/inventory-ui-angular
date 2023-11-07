import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Inventory } from 'src/app/model/Inventory';
import { AppService } from 'src/app/service/app-service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit, OnDestroy {

  stockData: Inventory[] = [];
  productName: string[] = [];
  data: number[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.stockChart();
  }

  stockChart() {
    this.appService.getInventorie().subscribe(
      (response: Inventory[]) => {
       
        for (var item of response){
          if(item.up){
            this.productName.push(item.productName);
            this.data.push(item.newQuantity);   
          }
        }

        stockSize(this.productName, this.data);
      },
      (error: HttpErrorResponse) => {
        console.log("error status :  %s", error.status);
      }
    );
  }
  ngOnDestroy(): void {
    this.stockChart()
  }
}

function stockSize(productName: string[], productQuantity: number[]) {

  const stock: any = document.getElementById("stock");

  var donutData = {
    labels: productName,
    datasets: [
      {
        data: productQuantity,
        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
      }
    ]
  }
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var donutChart = new Chart(stock, {
    type: 'doughnut',
    data: donutData,
    options: donutOptions
  })
}

