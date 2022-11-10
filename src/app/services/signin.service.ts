import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }
  signin(data:any): Observable<any> {
    return this.http.post('https://dev-connect-rest-api.herokuapp.com/auth/signIn', data);
  }

}
