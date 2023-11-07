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
import { InvoiceSaleComponent } from './home/invoice/invoice-sale/invoice-sale.component';
import { InvoiceListComponent } from './home/invoice/invoice-list/invoice-list.component';

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
    path: "customers",
    component: CustomerComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {                                                                                                                                                                                                                                                                                                                               
    path: "invoice",
    component: InvoiceListComponent
  },
  {                                                                                                                                                                                                                                                                                                                               
    path: "invoice/:saleId",
    component: InvoiceSaleComponent
  },

  {
    path: "page-not-found",
    component: PageNotFoundComponent
  },

  {
    path: '**',
    redirectTo: '/page-not-found',
    title:"Page-not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
