import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/Customer';
import { Inventory } from 'src/app/model/Inventory';
import { Product } from 'src/app/model/Product';
import { Sale } from 'src/app/model/Sale';
import { Status } from 'src/app/model/enum/status';
import { AppService } from 'src/app/service/app-service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit, OnDestroy {
  
  @Output() public childEvent = new EventEmitter();
  products!: Product[];
  priceDetectedById!: any;
  price!: number;
  productsById = new BehaviorSubject<Product[]>([]);
  productName = new BehaviorSubject<string>('');
  // isLoading = new BehaviorSubject<boolean>(false);
  @Input()public isLoading$!:Observable<boolean>;
  quantity:any;
  listOfProducToSale$ = new BehaviorSubject<Sale[]>([]);
  ProducToSale: Sale [] = [];
  item: number = 0;
  customers: Customer[] = [];
  sales: Sale[] = [];
  saleForm = this.fb.group({
    id: [''],
    customerForm: this.fb.group(
      {
        customerId: ["", Validators.required],
        fullName: ["",],
        email: [""],
        phone: [""],
        address: [""]
      }),
    productForm: this.fb.group({
      productId: ["", Validators.required],
      name: [""],
      code: [""],
      description: [""],
      price: [""]
    }),
    quantity: ["", [Validators.required]],
    price: [""],
    amount: [""],
    orderAt: [""],
    arrivesAt: [""],
    isArrived: [""],
    status: [Status.COMPLETE]
  });
  saleToSave: Sale = {
    customer: {
      id: 0,
      fullName: '',
      email: '',
      phone: '',
      address: '',
      nationalIdCard: ''
    },
    product: {
      id: null,
      name: '',
      description: '',
      price: 0,
      code: ''
    },
    quantity: this.saleForm.value.quantity,
    amount: 0
  };
 
  constructor(private appService: AppService, private fb: FormBuilder, private snackBar: SnackBarService) { }
  
  ngOnInit(): void {
    this.appService.getCustomer().subscribe(
      (response) => {
        this.customers = response;
        this.snackBar.openSnackBar("Customer Loaded","X");
      }
    );
    this.appService.getProducts().subscribe(
      (response) => {
        this, this.products = response;
        this.productsById.next(response);
        this.snackBar.openSnackBar("Product Loaded","X");
      }
    );
  }

  // Method to authomatic detected the price of product when it's selected
  automatePriceDetected(productSelected: any) {
    for (const iterator of this.productsById.value) {
      if (iterator.id === productSelected) {
        this.productName.next(iterator.name);
        this.priceDetectedById = iterator.price.toPrecision(5);
        this.snackBar.openSnackBar("Price Loaded","X");
      }
    }
   
  }

  addProductToSale() {
    for (const product of this.productsById.value) {
      if (product.id === this.saleForm.value.productForm?.productId) {
        this.productName.next(product.name);
      }
    }
    this.quantity = this.saleForm.value.quantity;
    this.saleToSave = {
      customer: {
        id: this.saleForm.value.customerForm?.customerId,
        fullName: '',
        email: '',
        phone: '',
        address: '',
        nationalIdCard: ''
      },
      product: {
        id: this.saleForm.value.productForm?.productId,
        name: this.productName.value,
        description: '',
        price: this.priceDetectedById,
        code: ''
      },
      quantity: this.saleForm.value.quantity,
      status: Status.INPROGRESS,
      price: this.priceDetectedById,
      amount: Math.imul(this.quantity as number,this.priceDetectedById)
    };

    this.ProducToSale.push(this.saleToSave);
    // this.listOfProducToSale$.next(this.listOfProducToSale);
    // count to display the item numbers
    this.item = this.ProducToSale.length;
    this.snackBar.openSnackBar("Product added to the cart","X");
  }
  
  // send data to the parent component.
  onSubmit() {
    // emit the event to the parent component.
    this.childEvent.emit(this.ProducToSale);
    this.clear()
  }
  
  reset() {
    this.item=0;
    this.saleForm.reset();
  }
  clear() {
    this.ProducToSale.splice(0);
    this.item = 0;
    this.saleForm.reset();
    this.snackBar.openSnackBar("Cart cleaned","X");
  }


  ngOnDestroy(): void {
    this.reset();
    this.listOfProducToSale$.unsubscribe();
    this.productName.unsubscribe();
    this.productsById.unsubscribe();

    this.childEvent.unsubscribe();
    
  }
}