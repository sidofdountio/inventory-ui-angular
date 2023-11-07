import { InvoiceSale } from "./invoice-sale";

export interface CustormResponse{
   timeStamp: Date;
   statusCode: number;
   status:string;
   reason: string;
   message: string;
   developerMessage:string;
   data: {
    invoiceSale?:InvoiceSale,
    invoiceSales?:InvoiceSale[] | null
   };

}