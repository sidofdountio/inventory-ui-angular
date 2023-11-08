import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Purchase } from '../model/Purchase';
import { AppService } from '../service/app-service';
import { SnackBarService } from '../service/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SaleAndPurcharse } from '../model/sale-and-purcharse';
import { Sale } from '../model/Sale';
import { Inventory } from '../model/Inventory';

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

  purchases: Purchase[] = [];
  public totalData: SaleAndPurcharse={
    totalSale: 0,
    totalPurchse: 0,
    totalCustomer: 0,
    totalSupplier: 0,
    totalbeerRac: 0,
    totalSaleNumber:0
  };
  public stockData:Inventory[]=[];
 
  constructor(private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private snackbarService: SnackBarService) { };
    
  ngOnInit(): void {
    this.appService.getPurchase().subscribe(
      (response: Purchase[]) => {
        this.purchases = response;
        this.totalData.totalPurchse = this.purchases.length;
        this.snackbarService.openSnackBar("Content Loaded","close");
      },
      (error: HttpErrorResponse) => {
        console.log("error :  %s",error.status);
        this.snackbarService.openSnackBar("An error occured","close");
      }
    );

    this.appService.getSales().subscribe(
      (response: Sale[]) => {
        for (let sale of response){
          this.totalData.totalSale += sale.amount;
        }
        this.totalData.totalSaleNumber = response.length;
      },
      (error: HttpErrorResponse) => {
        console.log("error :  %s",error.status);
        this.snackbarService.openSnackBar("An error occured","close");
      }
    );

    this.appService.getCustomer().subscribe(
      (response) => {
        this.totalData.totalCustomer = response.length;
      },
      (error: HttpErrorResponse) => {
        console.log("error :  %s",error.status);
        this.snackbarService.openSnackBar("An error occured","close");
      }
    );

    this.appService.getSuppliers().subscribe(
      (response) => {
        this.totalData.totalSupplier = response.length;
      },
      (error: HttpErrorResponse) => {
        console.log("error :  %s",error.status);
        this.snackbarService.openSnackBar("An error occured","close");
      }
    );

    
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
