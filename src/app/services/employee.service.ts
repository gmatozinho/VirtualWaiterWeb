import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL + '/funcionario/', JSON.stringify(employee), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  update(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL + '/funcionario/', JSON.stringify(employee), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  remove(employee: Employee): Observable<Employee> {
    employee.ativo = false;
    return this.http.post<Employee>(this.API_URL + '/funcionario/', JSON.stringify(employee), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get(this.API_URL + '/funcionario?id=' + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByUserId(id: number) {
    return this.http.get(this.API_URL + '/funcionario?usuario=' + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByEstablishmentId(id: number) {
    return this.http.get(this.API_URL + '/funcionario?estabelecimento=' + id + '&ativo=true')
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
