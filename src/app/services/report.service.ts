import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  getSalesPerYear(id: number) {
    return this.http.get(this.API_URL + '/report/totaldevendasporano?id=' + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getSalesPerDayActualMonth(id: number) {
  return this.http.get(this.API_URL + '/report/vendapordianomescorrente?id=' + id)
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
