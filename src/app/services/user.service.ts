import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // we can now access environment.apiUrl
    API_URL = environment.apiUrl;

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };


    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get(this.API_URL + '/usuario' + '?ativo=true')
        .pipe(
        retry(1),
        catchError(this.handleError)
        );
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/usuario?id=' + id + '&ativo=true')
        .pipe(
        retry(1),
        catchError(this.handleError)
        );
    }

    getByEmail(email: string) {
        return this.http.get(this.API_URL + '/usuario?email=' + email + '&ativo=true')
        .pipe(
        retry(1),
        catchError(this.handleError)
        );
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.API_URL + '/usuario/', JSON.stringify(user), this.httpOptions)
        .pipe(
        retry(1),
        catchError(this.handleError)
        );
    }

    update() {
        /* return this.http.put('/api/users/' + user.id, user); */
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
