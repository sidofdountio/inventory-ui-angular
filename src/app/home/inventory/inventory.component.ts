import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Inventory } from 'src/app/model/Inventory';
import { AppService } from 'src/app/service/app-service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit, OnDestroy {
  isUp: boolean = true;
  inventories: Inventory[] = [];
  displayedColumns: string[] = ['up', 'date', 'label', 'productName', 'orldQuantity', 'orldPrice', 'orldAmount', 'newQuantity', 'newPrice', 'newAmount']
  dataSource = new MatTableDataSource<Inventory>(this.inventories);
  constructor(private appService: AppService, private snackbar: SnackBarService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.onGetInventorie();
    // this.dataSource.data = this.inventories;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onGetInventorie(): void {
    this.appService.getInventorie().subscribe(
      (response: Inventory[]) => {
        this.inventories = response;
        this.dataSource.data = response;
        this.snackbar.openSnackBar("Inventory Loaded", "X");
      },
      (error: HttpErrorResponse) => {
        console.log("Error code : %s", error.status);
      }
    )
  }

  ngOnDestroy(): void {
    this.onGetInventorie()
  }
}
