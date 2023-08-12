import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/appInterface/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
productToSave!: FormGroup;
id!:number;
name:string;
description:string;
price:number;
code:string;

constructor(@Inject(MAT_DIALOG_DATA) public data: Product,public dialogRef:MatDialogRef<AddProductComponent>, private formBuild: FormBuilder) {
  this.id = data.id;
  this.price = data.price;
  this.name = data.name;
  this.description = data.description;
  this.code = data.code;
}

ngOnInit(): void {
  this.productToSave = this.formBuild.group({
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
onSaveProduct() {
  this.dialogRef.close(this.productToSave.value);

}

 
}
