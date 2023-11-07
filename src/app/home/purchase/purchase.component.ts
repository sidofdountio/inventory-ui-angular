import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/Product';
import { Purchase } from 'src/app/model/Purchase';
import { Supplier } from 'src/app/model/Supplier';
import { Status } from 'src/app/model/enum/status';
import { AppService } from 'src/app/service/app-service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, AfterViewInit, OnDestroy {

  isDisabled!: boolean;
  priceDetectedById: number = 0;
  productToDetectPrice: Product | undefined;
  productsById = new BehaviorSubject<Product[]>([]);
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
    price: ['',],
    amount: [''],
    orderAt: [''],
    arrivesAt: [''],
    isArrived: [''],
    status: [Status.COMPLETE]
  });

  constructor(private appService: AppService,
    private fb: FormBuilder,
    private snackbarService: SnackBarService) { }

  ngOnInit(): void {
    this.isDisabled = true;
    this.onGetPurchase();
    this.onGetProduct();
    this.onGetSupplier();
  }


  onGetPurchase(): void {
    this.appService.getPurchase().subscribe(
      (response: Purchase[]) => {
        this.dataSource.data = response;
        this.snackbarService.openSnackBar("Purchase Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        console.log("Error code : %s", error.status);
        this.snackbarService.openSnackBar("Error while Loaded purchase", "close");
      }
    );
  }

  // Get data from the form whit this method and submit it.
  onSubmit() {
    const idOfSupplier = this.purchaseForm.value.supplierForm?.id;
    const idP = this.purchaseForm.value.productForm?.id;
    this.purchase = {
      supplier: this.supplier = {
        id: idOfSupplier,
        address: '',
        email: ' ',
        fullName: ' ',
        phone: ''
      },
      product: this.product = {
        code: '',
        description: '',
        name: '',
        price: 0,
        id: idP
      },
      price: this.purchaseForm.value.price,
      status: Status.COMPLETE,
      quantity: this.purchaseForm.value.quantity
    }
    // call and passed object purchase to method save a new pucharse.
    this.onSavePurchase(this.purchase);
    console.log(this.purchase)
  }

  onSavePurchase(purchaseToSave: Purchase): void {
    this.appService.addPurchase(purchaseToSave).subscribe(
      () => {
        this.onGetPurchase();
        this.snackbarService.openSnackBar("Product successful purchased", "close");
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar("An error occured", "close");
        console.log("Error code : %s", error.status);
      }
    )
  }

  // Fetching product.
  onGetProduct(): void {
    this.appService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.productsById.next(response);
        this.snackbarService.openSnackBar("Product successful Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        console.log("Error code : %s", error.status);
        this.snackbarService.openSnackBar("An error occured", "close");
      }
    )
  }

  // Method to authomatic detected the price of product when it's selected
  automatePriceDetected(productSelected: any) {
    for (const iterator of this.productsById.value) {
      if (iterator.id === productSelected) {
        this.priceDetectedById = iterator.price;
        console.log(this.priceDetectedById);
      }
    }
  }

  // List of suppliers
  onGetSupplier(): void {
    this.appService.getSuppliers().subscribe(
      (response: Supplier[]) => {
        this.suppliers = response;
        this.snackbarService.openSnackBar("Purchase Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar("Error due purchased", "close");
        console.log("Error code : %s", error.status);
      }
    )
  }

  resetForm():void{
    this.purchaseForm.reset();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.onGetProduct();
    this.onGetPurchase();
    this.onGetSupplier();
    this.automatePriceDetected
    this.productsById.unsubscribe();
  }

}

