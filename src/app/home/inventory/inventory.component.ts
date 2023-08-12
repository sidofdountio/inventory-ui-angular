import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Inventory } from 'src/app/appInterface/Inventory';
import { AppService } from 'src/app/app-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  inventories: Inventory[] = [];
  displayedColumns: string[] = ['date', 'label', 'productName', 'orldQuantity', 'orldPrice', 'orldAmount', 'newQuantity', 'newPrice', 'newAmount']
  dataSource = new MatTableDataSource<Inventory>(this.inventories);
  constructor(private appService: AppService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.onGetInventorie();
    // this.dataSource.data = this.inventories;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onGetInventorie():void{
    this.appService.getInventorie().subscribe(
      (response:Inventory[])=>{
        this.inventories = response;
        this.dataSource.data = response;
      },
      (error:HttpErrorResponse)=>{
        alert('ERROR :' +error.message);
      }
    )
  }
}
