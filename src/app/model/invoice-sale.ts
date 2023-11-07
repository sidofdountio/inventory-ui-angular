import { Customer } from "./Customer";
import { Sale } from "./Sale";
import { InvoiceStatus } from "./enum/invoice-status";
import { InvoiceType } from "./enum/invoice-type";

export interface InvoiceSale {
    id:number;
    invoiceType:InvoiceType;
    invoiceStatus:InvoiceStatus;
    tax:number;
    subTotal:number;
    total:number;
    invoiceNumber:number;
    date:Date;
    sale?:Sale;
    customer?:Customer;
}
