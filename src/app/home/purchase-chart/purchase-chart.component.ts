import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-purchase-chart',
  templateUrl: './purchase-chart.component.html',
  styleUrls: ['./purchase-chart.component.css']
})
export class PurchaseChartComponent implements OnInit{

  productName: string[] = [];
  data: number[] = [];

  private constructor(){}
  ngOnInit(): void {
    purchaseChart(this.productName,this.data);
  }
 

}

const stackedBarChartOptions = {
  responsive              : true,
  maintainAspectRatio     : false,
  scales: {
    xAxes: [{
      stacked: true,
    }],
    yAxes: [{
      stacked: true
    }]
  }
}


function purchaseChart(productName:string[],quantity:number[]) {

  const puchase: any = document.getElementById("purchase");
  'use strict'

  const ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }

  const mode: any = 'index'
  const intersect: boolean = true
  const stockChart = new Chart(puchase, {
    type: 'bar',
    data: {
      labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          data: [1000, 2000, 3000, 2500, 2700, 2500, 3000]
        },
        {
          backgroundColor: '#ced4da',
          borderColor: '#ced4da',
          data: [700, 1700, 2700, 2000, 1800, 1500, 2000]
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
    }
  })

}
