import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Sale } from 'src/app/model/Sale';
import { AppService } from 'src/app/service/app-service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit{

  public isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  sales:Sale[]=[];
  public saleList = new BehaviorSubject<Sale[]>([]);
  displayedColumns: string[] = ['position', 'fullName', 'name', 'quantity','price', 'amount','orderAt','action'];
  dataSource = new MatTableDataSource<Sale>(this.sales);
  constructor(private appService:AppService,private snackBar: SnackBarService,private router:Router){}

  ngOnInit(): void {
    this.onGetSale();
  }
  
  public onGetSale() {
    this.appService.getSales().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.saleList.next(response);
        this.snackBar.openSnackBar("Seller Loaded","close")
      },
      (error: HttpErrorResponse) => {
        console.log("Error : %s ",error.message);
        this.snackBar.openSnackBar("An error occured","close")
      }
    );
  }

  onViewInvoice(saleId: any) {
    this.router.navigate(["/invoice",saleId]);
  }
  
  onEdit(arg0: any) {}

  onAddSale(sale:Sale[]) {
   
   this.isLoading.next(true);
    this.appService.addSale(sale).subscribe
      (
        () => {
         
          this.onGetSale();
          this.snackBar.openSnackBar("seller successfuly saved", "close");
          this.isLoading.next(false);
        },
        (error: HttpErrorResponse) => {
          this.isLoading.next(false);
          this.snackBar.openSnackBar("Error occures du saving", "close");
          console.log("error : %s ", error.status);
        }
      );
  }

}
