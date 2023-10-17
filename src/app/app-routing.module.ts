import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './home/customer/customer.component';
import { ProductComponent } from './home/product/product.component';
import { SupplierComponent } from './home/supplier/supplier.component';
import { PurchaseComponent } from './home/purchase/purchase.component';
import { InventoryComponent } from './home/inventory/inventory.component';
import { SaleComponent } from './home/sale/sale.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"admin",
    component: HomeComponent
  },
  {
    path: "customer",
    component: CustomerComponent
  },
  {
    path: "product",
    component: ProductComponent
  },
  {
    path: "supplier",
    component: SupplierComponent
  },
  {
    path: "purchase",
    component:PurchaseComponent
  },
  {
    path: "sale",
    component: SaleComponent
  },
  {
    path: "customer",
    component: CustomerComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
