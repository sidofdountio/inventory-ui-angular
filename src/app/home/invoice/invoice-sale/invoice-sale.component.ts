import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';

import { DataState } from 'src/app/model/enum/data-state';
import { InvoiceSale } from 'src/app/model/invoice-sale';
import { AppService } from 'src/app/service/app-service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-invoice-sale',
  templateUrl: './invoice-sale.component.html',
  styleUrls: ['./invoice-sale.component.css']
})
export class InvoiceSaleComponent implements OnInit, OnDestroy {


  appSate$!: Observable<InvoiceSale[]>;
  readonly DataState = DataState;
  dataSuject$ = new BehaviorSubject<InvoiceSale | null>(null);
  state: DataState = DataState.LOADING_STATE;
  // @ViewChild("invoiceContent") invoiceContent!: ElementRef;


  constructor(private appservice: AppService, private snackBar: SnackBarService,
    private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {


    this.appSate$ = this.route.paramMap.pipe(

      switchMap((params: ParamMap) =>
        this.appservice.invoiceSaleBySaleId$(params.get('saleId')!)
          .pipe(
            tap(
              (data) => {
                this.state = DataState.LOADING_STATE;
              },
              () => {
                this.state = DataState.ERROR_STATE;
              },
              () => {
                this.state = DataState.LOADED_STATE;
              }

            ))
      ))


  }

  exportToPDF(invoiceNumber:any) {
    const button = document.getElementById('invoice-contents');
    if ( button){

      html2canvas(button).then((canvas) => {
        const data = canvas.toDataURL();
        const documentDefinition = {
          content: [
            {
              image: data,
              width: 500
            }
          ]
        };
        pdfMake.createPdf(documentDefinition).download('invoice-'+invoiceNumber +'.pdf');
      });
    }
  }

  // onInvoice(){
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.invoice$ = this.appservice.saleById$(id as unknown as number).pipe(
  //     map( response =>{
  //       return response;
  //     })
  //   )
  // }

  ngOnDestroy(): void {
    this.appSate$
  }

}

function printTable() {



}

