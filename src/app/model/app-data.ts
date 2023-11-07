import { DataState } from "./enum/data-state";

export interface AppState<T>{
    appData?: T ;
    dataState: DataState;
    error?: string;
}