import { Product } from "./Product";

export interface Cart{
    id?:number;
    product:Product;
    quantity:number;
    amount:number;
}