import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/service/app-service';
import { Customer } from 'src/app/model/Customer';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/service/snack-bar.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  // form build to generate customer json object.
  customerForm = this.fb.group({
    fullName: ["", [Validators.required]],
    email: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    address: ["", [Validators.required]],
    nationalIdCard: ["", [Validators.required]]
  })


  customers: Customer[] = [];

  displayedColumns: string[] = ['position', 'fullName', 'email', 'address', 'phone', 'idCard', 'action'];
  dataSource = new MatTableDataSource<Customer>(this.customers);

  constructor(private appService: AppService, private fb: FormBuilder, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.onGetCustomer();
  }

  // 
  onGetCustomer(): void {
    this.appService.getCustomer().subscribe(
      (response: Customer[]) => {
        this.dataSource.data = response;
        this.snackBar.openSnackBar("customer successfuly Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        console.log("error : %s ", error.status);
      }
    )
  }

  onSubmit() {
    this.appService.addCustomer(this.customerForm.value as Customer)
      .subscribe
      (
        () => {
          this.onGetCustomer();
          this.snackBar.openSnackBar("customer successfuly saved", "close");
          this.resetForm();

        },
        (error: HttpErrorResponse) => {
          this.snackBar.openSnackBar("error du saving", "close");
          console.log("error : %s ", error.status);
        }
      );
  }

  resetForm(): void {
    this.customerForm.reset();
  }

  onEdit(customerId: number) {
  }
  onDelete(customerId: any) {
    if (confirm("Do you wand to delete this Customer.")) {
      this.appService.deleteCustomer$(customerId).subscribe
        ((response) => {
          if (response){
            this.snackBar.openSnackBar("Deleted successfuly", "X");
            this.onGetCustomer();
          }
        }),
        () => {
          this.snackBar.openSnackBar("Operation Failled", "X");
        }
    }

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.onGetCustomer();
    this.onSubmit();
  }
}
