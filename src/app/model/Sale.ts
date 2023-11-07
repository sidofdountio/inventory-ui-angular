import { Status } from "./enum/status";
import { Customer } from "./Customer";
import { Product } from "./Product";

export interface Sale{
    id?:number;
    customer?:Customer;
    product?:Product;
    quantity?:any;
    price?:number;
    amount?:number;
    orderAt?:string;
    status?:Status;
}