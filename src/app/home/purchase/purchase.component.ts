import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/appInterface/Product';
import { Purchase } from 'src/app/appInterface/Purchase';
import { Supplier } from 'src/app/appInterface/Supplier';
import { Status } from 'src/app/enum/status';
import { AppService } from 'src/app/app-service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, AfterViewInit {


  purchases: Purchase[] = [];
  products: Product[] = [];
  selectedValue!: string;

  suppliers: Supplier[] = []

  product!: Product;
  supplier!: Supplier;
  displayedColumns: string[] = ['position', 'supplierName', 'productName', 'quantity', 'price', 'amount', 'orderAt'];
  dataSource = new MatTableDataSource<Purchase>(this.purchases);


  purchase: Purchase = {
    id: 0,
    supplier: this.supplier,
    product: this.product,
    quantity: 0,
    price: 0,
    amount: 0,
    orderAt: '',
    arrivesAt: '',
    isArrived: false,
    status: Status.COMPLETE
  };



  ngOnInit(): void {
    this.onGetPurchase();
    this.onGetProduct();
    this.onGetSupplier();
  }

  constructor(private appService: AppService, private fb: FormBuilder) { }

  purchaseForm = this.fb.group({
    id: [''],
    supplierForm: this.fb.group(
      {
        id: ['', Validators.required],
        fullName: [''],
        email: [''],
        phone: [''],
        address: ['']
      }),
    productForm: this.fb.group(
      {
        id: ['', Validators.required],
        name: [''],
        code: [''],
        description: [''],
        price: ['']
      }),
    quantity: ['', Validators.required],
    price: ['', Validators.required],
    amount: [''],
    orderAt: [''],
    arrivesAt: [''],
    isArrived: [''],
    status: [Status.COMPLETE]
  });






  onGetPurchase(): void {
    this.appService.getPurchase().subscribe(
      (response: Purchase[]) => {
        this.dataSource.data = response;
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  onSavePurchase(purchaseToSave: Purchase): void {
    this.appService.addPurchase(purchaseToSave).subscribe(

      (response: Purchase) => {
        alert('GOOD');
        this.onGetPurchase();
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  onSubmit() {
    // console.log(this.purchaseForm.value);
    const idS = this.purchaseForm.value.supplierForm?.id;
    const idP = this.purchaseForm.value.productForm?.id;
    console.log( " track"+ this.supplier)
    this.purchase = {
      supplier: this.supplier={ 
        id: idS,
        address:'',
        email: ' ',
        fullName: ' ',
        phone:''
      },
      product: this.product={
        code: '',
        description:'',
        name:'',
        price: 0,
        id:idP
      },
      price: this.purchaseForm.value.price,
      status: Status.COMPLETE,
      quantity: this.purchaseForm.value.quantity
    }

    this.onSavePurchase(this.purchase);

  }

  onGetProduct(): void {
    this.appService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  onGetSupplier(): void {
    this.appService.getSuppliers().subscribe(
      (response: Supplier[]) => {
        this.suppliers = response;
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}

