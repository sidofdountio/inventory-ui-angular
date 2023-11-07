import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Inventory } from '../model/Inventory';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Purchase } from '../model/Purchase';
import { Supplier } from '../model/Supplier';
import { Customer } from '../model/Customer';
import { Product } from '../model/Product';
import { Sale } from '../model/Sale';
import { CustormResponse } from '../model/customer-response';
import { InvoiceSale } from '../model/invoice-sale';
@Injectable({
  providedIn: 'root'
})
export class AppService {
 

  private readonly URL = environment.URL;
  constructor(private http: HttpClient) { }

  public getInventorie(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.URL}/inventories`)
      .pipe(
        tap(console.log)
      )
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`)
      .pipe(
        tap(console.log)
      )
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/product/{id}`)
      .pipe(
        tap(console.log)
      )
  }

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.URL}/suppliers`)
      .pipe(
        tap(console.log)
      )
  }

  addSupplier(supplierToAdd: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.URL}/addSupplier`, supplierToAdd)
      .pipe(
        tap(console.log)
      )
  }



  public getPurchase(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.URL}/purchases`)
      .pipe(
        tap(console.log)
      )
  }

  public addPurchase(purchaseToAdd: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.URL}/addPurchase`, purchaseToAdd)
      .pipe(
        tap(console.log)
      )
  }

  // add new sale
  addSale(saleToAdd: Sale[]): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.URL}/addSale`, saleToAdd)
      .pipe(
        tap(console.log)
      )
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.URL}/sales`)
      .pipe(
        tap(console.log)
      )
  }
  // end sale

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/addProduct`, product)
      .pipe(
        tap(console.log)
      );
  }
  
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.URL}/addCustomer`, customer)
      .pipe(
        tap(console.log)
      );
  }


  editeProduct(prodtuctToUpdate: Product) {
    return this.http.put<Product>(`${this.URL}/editProduct`, prodtuctToUpdate)
      .pipe(
        tap(console.log)
      );
  }


  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.URL}/customers `)
      .pipe(
        tap(console.log)
      )
  }



  // invoice
  invoiceSales$ = <Observable<InvoiceSale[]>>
    this.http.get<InvoiceSale>(`${this.URL}/invoices`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  invoiceSale$ = <Observable<CustormResponse>>
    this.http.get<CustormResponse>(`${this.URL}/invoice`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  invoiceSaleBySaleId$ = (saleId: number | string ) => <Observable<InvoiceSale[]>>
    this.http.get<InvoiceSale>(`${this.URL}/invoice/${saleId}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  // end invoice




  handlerError(handlerError: HttpErrorResponse): Observable<never> {
    console.log("An error occured - Error code %s ", handlerError.status)
    return throwError(() => `An error occured - Error code :${handlerError.status}`);
  }


}
