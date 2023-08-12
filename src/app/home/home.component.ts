import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Purchase } from '../appInterface/Purchase';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Insight', cols: 1, rows: 1 },
          { title: 'Stock chart', cols: 1, rows: 1 },
          { title: 'Recent transaction', cols: 1, rows: 1 },
          { title: 'Purchase chart', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Insight', cols: 2, rows: 1 },
        { title: 'Stock chart', cols: 1, rows: 1 },
        { title: 'Recent transaction', cols: 1, rows: 2 },
        { title: 'Purchase chart', cols: 1, rows: 1 }
      ];
    })
  );

  purchase: Purchase[] = [];
  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    
  }

  // function stockCharts(){
  //   const data = {
  //     labels: [
  //       'Red',
  //       'Blue',
  //       'Yellow'
  //     ],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [300, 50, 100],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };
  //   const ctx:any = document.getElementById('stock');
  //       const myChart = new Chart(ctx, {
  //         type: 'pie',
  //         data,

  //     });
  //     return myChart;

}
