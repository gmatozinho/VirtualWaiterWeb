import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EstablishmentPlan } from '../models/EstablishmentPlan';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentPlanService {

  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(establishmentPlan: EstablishmentPlan): Observable<EstablishmentPlan> {
    return this.http.post<EstablishmentPlan>(
      this.API_URL + '/estabelecimentoplano/',
      JSON.stringify(establishmentPlan),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(establishmentPlan: EstablishmentPlan): Observable<EstablishmentPlan> {
    return this.http.post<EstablishmentPlan>(
      this.API_URL + '/estabelecimentoplano/',
      JSON.stringify(establishmentPlan),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/estabelecimentoplano')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }
  // PutCheckAtive
  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/estabelecimentoplano?id=' + id)
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
