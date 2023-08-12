import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {
  colorName: string[] = ['Red', 'Blue', 'Yellow'];
  data: number[] = [300, 50, 100];
  ngOnInit(): void {
    // stockChart(this.colorName,this.data);
    stockSize();
  }



}
function stockSize(){
  
  const stock: any = document.getElementById("stock");

  var donutData        = {
    labels: [
        'Chrome', 
        'IE',
        'FireFox', 
        'Safari', 
        'Opera', 
        'Navigator', 
    ],
    datasets: [
      {
        data: [700,500,400,600,300,100],
        backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
      }
    ]
  }
  var donutOptions     = {
    maintainAspectRatio : false,
    responsive : true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var donutChart = new Chart(stock, {
    type: 'doughnut',
    data: donutData,
    options: donutOptions      
  })
}

