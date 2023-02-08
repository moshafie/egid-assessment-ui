
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export  class ServecisHandlers{

     
    constructor(private http: HttpClient) {
    }
    public  GetService<T>(url: string): Observable<T> {
        return this.http.get<T>(url).pipe(
            retry(3),
            catchError(this.error)
        );
    }
    public  PostService<T>(url: string, data: any): Observable<T> {
        return this.http.post<T>(url, data).pipe(
            retry(3),
            catchError(this.error)
        );
    }
    public  PutService<T>(url: string, data: any): Observable<T> {
        return this.http.put<T>(url, data).pipe(
            retry(3),
            catchError(this.error)
        );
    }
    public  DeleteService<T>(url: string): Observable<T> {
        return this.http.delete<T>(url).pipe(
            retry(3),
            catchError(this.error)
        );
    }
    private  error(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
 }
