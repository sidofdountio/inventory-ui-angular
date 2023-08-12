import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/app-service';
import { Supplier } from 'src/app/appInterface/Supplier';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit {

  //saving parameter
  id!: number;
  fullName!: string;
  email!: string;
  phone!: string;
  address!: string;

  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['position', 'fullName', 'email', 'address', 'phone', 'action'];
  dataSource = new MatTableDataSource<Supplier>(this.suppliers);

  constructor(private appService: AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onGetSupplier();
  }


  onAddSupplier() {

    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = {
      id: this.id, fullName: this.fullName, email: this.email, address: this.address, phone: this.phone
    };

    const dialogRef = this.dialog.open(AddSupplierComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (supplierToAdd) => {
          this.addSupplier(supplierToAdd);
        })

  }

  addSupplier(supplierToAdd: any) {

  }




  onGetSupplier(): void {
    this.appService.getSuppliers().subscribe(
      (response: Supplier[]) => {
        this.dataSource.data = response;
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  onEdit(supplierId: number) {

  }
  onDelete(supplierId: any) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
