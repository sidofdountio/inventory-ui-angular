import { Status } from "./enum/status";
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export interface Purchase{
    id?:number;
    supplier:Supplier;
    product:Product;
    quantity:any;
    price:any;
    amount?:number;
    orderAt?:string;
    arrivesAt?:string;
    isArrived?:boolean;
    status:Status;
}