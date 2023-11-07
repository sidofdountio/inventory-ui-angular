import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{

  productToUpdate!: FormGroup;
  id!: number;
  name:string;
  description:string;
  price:number;
  code:string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private formBuild: FormBuilder, public dialogRef: MatDialogRef<UpdateProductComponent>) {
    this.id = data.id;
    this.price = data.price;
    this.name = data.name;
    this.description = data.description;
    this.code = data.code;
  }

  ngOnInit(): void {
    this.productToUpdate = this.formBuild.group({
      id: [this.id, []],
      name: [this.name, Validators.required],
      price: [this.price, Validators.required],
      code: [this.code, Validators.required],
      description: [this.description, Validators.required], 
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onUpdateProduct() {
    this.dialogRef.close(this.productToUpdate.value)
  }
}
