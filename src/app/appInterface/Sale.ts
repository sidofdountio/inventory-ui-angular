import { Status } from "../enum/status";
import { Customer } from "./Customer";
import { Product } from "./Product";

export interface Sale{
    id:number;
    customer:Customer;
    product:Product;
    quantity:number;
    price:number;
    amount:number;
    orderAt:string;
    arrivesAt:string;
    isArrived:boolean;
    status:Status;
}