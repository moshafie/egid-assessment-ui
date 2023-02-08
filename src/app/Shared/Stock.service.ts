import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    heroesUrl: string;
    textfile: string;
    date: any;
  }
  export interface IStock {
    stokeId: number;
    stockName: string;
    price: number;
}
@Injectable()
export class StockService {
    url ="https://localhost:7192/api/";
    error: any;
    headers: string[] = [];
    Stocks: IStock[] = [];

  constructor(private http: HttpClient) { }

  getAllStocks():Observable<IStock[]> {
   return  this.http.get<IStock[]>(this.url+"Market/GetAllStocks")
    .pipe(
        retry(3),
        catchError(this.error)
    )
  }

  


 
}