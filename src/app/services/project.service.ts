import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private httpService: HttpService) {}
  get headers(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') as string);
    console.log(token.token);

    const config = new HttpHeaders({
      Accept: 'application/json ',
      'Content-Type': 'application/json',
      'x-auth-token': token.token,
    });
    return config;
  }
  createProject(data: any): Observable<any> {
    return this.http.post<any>(`${environment.project}`, data, {
      headers: this.headers,
    });
  }
  getProject(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.project}`, {
      headers: this.headers,
    });
  }
}
