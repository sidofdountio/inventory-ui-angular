import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';

import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './home/product/product.component';
import { CustomerComponent } from './home/customer/customer.component';
import { SaleComponent } from './home/sale/sale.component';
import { SupplierComponent } from './home/supplier/supplier.component';
import { PurchaseComponent } from './home/purchase/purchase.component';
import { AddProductComponent } from './home/product/add-product/add-product.component';
import { AddCustomerComponent } from './home/customer/add-customer/add-customer.component';
import { AddSupplierComponent } from './home/supplier/add-supplier/add-supplier.component';
import { AddPurchaseComponent } from './home/purchase/add-purchase/add-purchase.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PurchaseChartComponent } from './home/purchase-chart/purchase-chart.component';
import { StockChartComponent } from './home/stock-chart/stock-chart.component';
import { StatisticComponent } from './home/statistic/statistic.component';
import { InventoryComponent } from './home/inventory/inventory.component'; 
import { MatTable, MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { UpdateProductComponent } from './home/product/update-product/update-product.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddSaleComponent } from './home/sale/add-sale/add-sale.component';
import { InvoiceSaleComponent } from './home/invoice/invoice-sale/invoice-sale.component';
import { SpinerComponent } from './spiner/spiner.component';
import { ErrorComponent } from './error/error.component';
import { InvoiceListComponent } from './home/invoice/invoice-list/invoice-list.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    ProductComponent,
    CustomerComponent,
    SaleComponent,
    SupplierComponent,
    PurchaseComponent,
    AddProductComponent,
    AddCustomerComponent,
    AddSupplierComponent,
    AddPurchaseComponent,
    PurchaseChartComponent,
    StockChartComponent,
    StatisticComponent,
    InventoryComponent,
    UpdateProductComponent,
    PageNotFoundComponent,
    AddSaleComponent,
    InvoiceSaleComponent,
    SpinerComponent,
    ErrorComponent,
    InvoiceListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    LayoutModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
