import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  signup(data:any): Observable<any> {
    return this.http.post('https://dev-connect-rest-api.herokuapp.com/user/register', data);
  }

}
