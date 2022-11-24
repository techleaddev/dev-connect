import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TypeLogin,
  TypeLoginResponse,
  TypeSignup,
  TypeSignupResponse,
} from '../types/Auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(data:TypeSignup): Observable<TypeSignupResponse> {
    return this.http.post<TypeSignupResponse>(`${environment.signup}`, data);
  }
  login(data: TypeLogin): Observable<TypeLoginResponse> {
    return this.http.post<TypeLoginResponse>(`${environment.login}`, data);
  }

}
