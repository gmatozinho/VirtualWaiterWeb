import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   // we can now access environment.apiUrl
   API_URL = environment.apiUrl;

   // Http Options
   httpOptions = {
       headers: new HttpHeaders({
       'Content-Type': 'application/json'
       })
   };

   constructor(private http: HttpClient) {}

   create(order: Order): Observable<Order> {
     return this.http.post<Order>(
       this.API_URL + '/pedido/',
       JSON.stringify(order),
       this.httpOptions)
       .pipe(
       retry(1),
       catchError(this.handleError)
     );
   }

   // Error handling
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
