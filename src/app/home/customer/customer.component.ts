import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app-service';
import { Customer } from 'src/app/appInterface/Customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,AfterViewInit{
onAddCustomer() {
throw new Error('Method not implemented.');
}
  
  customers:Customer[]=[{
    fullName:"name",email:"email",address:"adre",id:1,phone:"phnoe",nationalIdCard:"1234"
  }];
  displayedColumns: string[] = ['position', 'fullName', 'email', 'address', 'phone','idCard','action'];
  dataSource = new MatTableDataSource<Customer>(this.customers);

  constructor(private appService:AppService){}
  ngOnInit(): void {
    this.onGetCustomer();
  }
  
  onGetCustomer() :void{
    this.appService.getCustomer().subscribe(
      (response:Customer[]) =>{
        this.dataSource.data = response;
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  

  onEdit(customerId: number) {

  }
  onDelete(customerId: any) {
    
  }

  @ViewChild(MatPaginator)paginator!:MatPaginator;

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
  }
}
