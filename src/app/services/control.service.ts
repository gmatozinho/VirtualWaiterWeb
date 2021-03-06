import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Control } from '../models/Control';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(control: Control): Observable<Control> {
    return this.http.post<Control>(this.API_URL + '/comanda/', JSON.stringify(control), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  update(control: Control): Observable<Control> {
    return this.http.post<Control>(this.API_URL + '/comanda/', JSON.stringify(control), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  remove(control: Control): Observable<Control> {
    return this.http.post<Control>(this.API_URL + '/comanda/', JSON.stringify(control), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/comanda')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/comanda?id='  + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByEstablishmentId(id: number) {
    return this.http.get(this.API_URL + '/comanda?estabelecimento=' + id)
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
