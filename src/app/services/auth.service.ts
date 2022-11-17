import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeLoginResponse, Users } from '../types/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(data: Users): Observable<Users> {
    return this.http.post<Users>(`${environment.signup}`, data);
  }
  signIn(data: Users): Observable<TypeLoginResponse> {
    return this.http.post<TypeLoginResponse>(`${environment.signin}`, data);
  }

  getUserInFo(): Observable<Users> {
    return this.http.get<Users>(`${environment.users}/info`);
  }
}
