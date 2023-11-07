import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-data';
import { CustormResponse } from 'src/app/model/customer-response';
import { DataState } from 'src/app/model/enum/data-state';
import { InvoiceStatus } from 'src/app/model/enum/invoice-status';
import { InvoiceSale } from 'src/app/model/invoice-sale';
import { AppService } from 'src/app/service/app-service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements AfterViewInit, OnInit, OnDestroy {
  invoiceSales!: InvoiceSale[];
  appSate$!: Observable<AppState<CustormResponse>>;
  readonly DataState = DataState;
  private subscription!: Subscription;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  readonly invoiceStatus =InvoiceStatus; 

  // https://www.postman.com/sidofdountio
  constructor(private appService: AppService, private snackBar: SnackBarService,
    private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.appSate$ = this.appService.invoiceSale$.pipe(
      map(
        response => {
          this.snackBar.openSnackBar("Invoice Loaded", "close");
          return {
            dataState: DataState.LOADED_STATE, appData: response
          }
        }
      ),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        this.snackBar.openSnackBar("Error Occured", "close");
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
    // Subscribe to the observable and assign the subscription
    // this.subscription = this.appSate$.subscribe();
    this.appService.invoiceSales$.subscribe(
      (data => {
        this.invoiceSales = data;
        this.dtOptions = {
          
         
          // Configure the DataTables Buttons extension
          dom: 'Bfrtip',
          buttons: [
            'print',
            'excel',
          ]
        };
      })
    );

  }



  onViewInvoice(saleId: any) {
    this.router.navigate(["/invoice", saleId]);
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-person-id")) {
        this.router.navigate(["/person", event.target.getAttribute("view-person-id")]);
      }
    });
  }


  ngOnDestroy(): void {
    
  }


}





