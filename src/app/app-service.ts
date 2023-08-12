import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Inventory } from './appInterface/Inventory';
import { Observable, tap } from 'rxjs';
import { Purchase } from './appInterface/Purchase';
import { Supplier } from './appInterface/Supplier';
import { Customer } from './appInterface/Customer';
import { Product } from './appInterface/Product';
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

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.URL}/suppliers`)
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



  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.URL}/customers `)
      .pipe(
        tap(console.log)
      )
  }
}
