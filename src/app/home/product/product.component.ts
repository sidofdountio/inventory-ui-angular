import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/appInterface/Product';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/app-service';
import { BehaviorSubject } from 'rxjs';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit, OnInit {



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

  constructor(private dialog: MatDialog, private appService: AppService) { }

  ngOnInit(): void {

    this.onGetProduct();

  }

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
        })

  }



  onEdit(id: number) {
    for (let index = 0; index < this.productToCheck.value.length; index++) {
      if (this.productToCheck.value[index].id === id) {
        this.productById = this.productToCheck.value[index];
      }

    }
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = this.productById;

    const dialogRef = this.dialog.open(UpdateProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToUpdate) => {
          this.onUpdate(productToUpdate);
        })
  }
  onGetProduct(): void {
    this.appService.getProducts().subscribe(
      (response: Product[]) => {
        this.dataSource.data = response;
        this.productToCheck.next(response);
      },
      (error: HttpErrorResponse) => {
        alert("ERROR " + error.message);
      }
    )
  }

  onUpdate(prodtuctToUpdate: Product) {
  }

  addProduct(prodtuctToAdd: Product) {
  }

  onDelete(id: number) {
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

