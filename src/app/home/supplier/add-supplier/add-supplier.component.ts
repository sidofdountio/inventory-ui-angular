import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Supplier } from 'src/app/appInterface/Supplier';
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit{
  supplierToAdd!:FormGroup;
  id!: number;
  fullName!: string;
  email!: string;
  phone!: string;
  address!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Supplier,public dialogRef:MatDialogRef<AddSupplierComponent>, private formBuild: FormBuilder) {
    this.id = data.id;
    this.address= data.address;
    this.fullName = data.fullName;
    this.phone = data.phone;
    this.email= data.email
  }

  ngOnInit(): void {
    this.supplierToAdd = this.formBuild.group({
      id:[this.id,[]],
      fullName:[this.fullName,Validators.required],
      email:[this.email,Validators.required],
      address:[this.address,Validators.required],
      phone:[this.phone,Validators.required]
    })
  
  }

  close(){
    this.dialogRef.close();
  }

  onSaveSupplier(){
    this.dialogRef.close(this.supplierToAdd.value);
  }

}
