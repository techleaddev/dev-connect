import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }
  sendPost(value:any): Observable<any>{
    return this.http.post<any>("https://dev-connect-rest-api.herokuapp.com/user/register", value)
  }
}
