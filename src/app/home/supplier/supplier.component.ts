import { AfterViewInit, Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app-service';
import { Supplier } from 'src/app/model/Supplier';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit, OnDestroy {

  //saving parameter
  id!: number;
  fullName!: string;
  email!: string;
  phone!: string;
  address!: string;

  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['position', 'fullName', 'email', 'address', 'phone', 'action'];
  dataSource = new MatTableDataSource<Supplier>(this.suppliers);

  constructor(private appService: AppService, public dialog: MatDialog,
    private snacbarSevice: SnackBarService) { }

  ngOnInit(): void {
    this.onGetSupplier();
  }

// on add new supplier: open modale, config modale and send data.
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
          this.onGetSupplier();
        },
        (error: HttpErrorResponse) => {
          this.snacbarSevice.openSnackBar("An error while added", "close");
        })
  }

  // add new supplier
  addSupplier(supplierToAdd: Supplier) {
    this.appService.addSupplier(supplierToAdd).
      subscribe(
        () => {
          this.onGetSupplier();
          this.snacbarSevice.openSnackBar("supplier successfuly added", "close");
        },
        (error: HttpErrorResponse) => {
          console.log("Error: %s", error.status);
          this.snacbarSevice.openSnackBar("An error while added", "close");
        }
      )
  }

  // Get suppliers
  onGetSupplier(): void {
    this.appService.getSuppliers().subscribe(
      (response: Supplier[]) => {
        this.dataSource.data = response;
        this.snacbarSevice.openSnackBar("supplier successfuly Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        console.log("Error code: " + error.status);
        this.snacbarSevice.openSnackBar("An error while Loaded", "close");
      }
    )
  }

  onEdit(supplierId: number) {
  }

  onDelete(supplierId: any) {
    confirm("Do you want to delete this supplier.")
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnDestroy(): void {
    this.addSupplier;
    this.onAddSupplier;
    this.onGetSupplier;
    this.onEdit;

  }


}
