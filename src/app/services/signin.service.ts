import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http: HttpClient) { }
  sendPost(value: any): Observable<any> {
    return this.http.post<any>("https://dev-connect-rest-api.herokuapp.com/auth/signIn", value)
  }
}
