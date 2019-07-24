import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Plan } from '../models/Plan';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(
      this.API_URL + '/plano/',
      JSON.stringify(plan),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(
      this.API_URL + '/plano/',
      JSON.stringify(plan),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/plano')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }
  // PutCheckAtive
  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/plano?id=' + id)
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
