import { AfterViewInit, Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/Product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app-service';
import { BehaviorSubject } from 'rxjs';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/service/snack-bar.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit, OnInit ,OnDestroy{

  productToCheck = new BehaviorSubject<Product[]>([]);
  products: Product[] = []
  productById!: Product;
  productToSave!: Product;

  id!: number;
  name!: string;
  description!: string;
  price!: number;
  code!: string;

  displayedColumns: string[] = ['position', 'name', 'code', 'price', 'action'];
  dataSource = new MatTableDataSource<Product>(this.products);


  constructor(private dialog: MatDialog, private appService: AppService, private snackbarService: SnackBarService) { }

  ngOnInit(): void {
    this.onGetProduct();
  }

  // on add product: open modal send data. config modale.
  onAddProduct() {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = {
      id: this.id, name: this.name, code: this.code, description: this.description, price: this.price
    };

    const dialogRef = this.dialog.open(AddProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToAdd) => {
          this.addProduct(productToAdd);
        },
        () => {
          console.log("Error due save product");
        })

  }

  // Edite product
  onEdit(id: number) {
    for (let index = 0; index < this.productToCheck.value.length; index++) {
      if (this.productToCheck.value[index].id === id) {
        this.productById = this.productToCheck.value[index];
      }
    }
    // matDialog confi
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = this.productById;

    // passing matDialogue and config to open 
    const dialogRef = this.dialog.open(UpdateProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToUpdate) => {
          this.onUpdate(productToUpdate);
        })
  }

  // Get products
  onGetProduct(): void {
    this.appService.getProducts().subscribe(
      (response: Product[]) => {
        this.dataSource.data = response;
        this.productToCheck.next(response);
        this.snackbarService.openSnackBar("Product Loaded", "close");
      },
      (error: HttpErrorResponse) => {
        this.snackbarService.openSnackBar("An error occured", "close")
        console.log("Error code : %s", error.message);
      }
    )
  }

  // edite product: Method that run api and be called.->
  onUpdate(prodtuctToUpdate: Product) {
    this.appService.editeProduct(prodtuctToUpdate)
      .subscribe(
        () => {
          this.snackbarService.openSnackBar("Product edited successfuly", "close");
          this.onGetProduct();
        },
        (error: HttpErrorResponse) => {
          console.log("Error: %s", error.status);
          this.snackbarService.openSnackBar("And error occured", "close");
        }
      )
  }

  // add product: Method that run api and be called.->
  addProduct(prodtuctToAdd: Product) {
    this.appService.addProduct(prodtuctToAdd)
      .subscribe(
        (response: Product) => {
          this.snackbarService.openSnackBar("Product added successfuly", "close");
          this.onGetProduct();
        },
        (error: HttpErrorResponse) => {
          this.snackbarService.openSnackBar("Error due save product", "close");
          console.log("Error code : %s", error.status);
        }
      )
  }

  // Delete
  onDelete(id: number) {
    confirm("Do you wand to delete this product.");
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.addProduct;
    this.onUpdate;
    this.onGetProduct;
    this.onAddProduct
    this.onEdit;
    this.onDelete


  }

}

