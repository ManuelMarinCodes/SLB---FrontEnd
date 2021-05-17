import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICustomer } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = "http://localhost:55602/api/bycustomcatname/";
  customerList: ICustomer[] = [];
  customer: ICustomer = {} as ICustomer;
  constructor(private http: HttpClient) { }

  getAllCustomers(){
    const requestCustomer = "all";
    const path = `${this.productUrl}${requestCustomer}`;
    return this.http.get<ICustomer[]>(path)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCustomerByCategory(category: string){
    const path = `${this.productUrl}${category}`;
    return this.http.get<ICustomer[]>(path)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
