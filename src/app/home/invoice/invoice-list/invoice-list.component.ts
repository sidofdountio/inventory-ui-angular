import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-data';
import { CustormResponse } from 'src/app/model/customer-response';
import { DataState } from 'src/app/model/enum/data-state';
import { InvoiceStatus } from 'src/app/model/enum/invoice-status';
import { InvoiceSale } from 'src/app/model/invoice-sale';
import { AppService } from 'src/app/service/app-service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements AfterViewInit, OnInit, OnDestroy {
  // https://www.postman.com/sidofdountio
  displayedColumns: string[] = ['invoiceNumber', 'name', 'status', 'date','action'];
  ELEMENT_DATA!: InvoiceSale[];
  dataSource = new MatTableDataSource<InvoiceSale>(this.ELEMENT_DATA);
  appSate$!: Observable<AppState<CustormResponse>>;
  readonly DataState = DataState;
  readonly invoiceStatus = InvoiceStatus;
  INVOICE_SALE_DATA: InvoiceSale[] = [];

  constructor(private appService: AppService, private snackBar: SnackBarService,
    private router: Router) { }

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

    this.appService.invoiceSales$.subscribe(
      (data => {
        this.dataSource.data = data;
        this.INVOICE_SALE_DATA  = data;
      })
    );

  }

  ngAfterViewInit(): void {
   
  }

  onViewInvoice(saleId: any) {
    this.router.navigate(["/invoice", saleId]);
  }

  generateExcelFile(): void {
    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.INVOICE_SALE_DATA);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Generate the Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, new Date()+'invoice_sale_list.xlsx');
  }
  
  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
  }

  ngOnDestroy(): void {
  }


}





