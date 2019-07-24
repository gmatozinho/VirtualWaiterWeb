import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Owner } from '../models/Owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.API_URL + '/dono/', JSON.stringify(owner), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  update(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.API_URL + '/dono/', JSON.stringify(owner), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/dono')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get(this.API_URL + '/dono?id=' + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByUserId(id: number) {
    return this.http.get(this.API_URL + '/dono?usuario=' + id)
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
