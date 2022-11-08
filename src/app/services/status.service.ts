import { environment } from './../../environments/environment.prod';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statusOb = new ReplaySubject<any[]>(1);

  get headers(): HttpHeaders {
    const { token } = JSON.parse(localStorage.getItem('user') as string);
    const config = new HttpHeaders({
      Accept: 'application/json ',
      'Content-Type': 'application/json',
      'x-auth-token': token,
    });
    return config;
  }
  constructor(private http: HttpClient) {}

  createStatus(data: any): Observable<any> {
    return this.http.post<any>(`${environment.project}/status`, data, {
      headers: this.headers,
    });
  }

  getAllStatus(id: string): void {
    this.http
      .get<any[]>(`${environment.project}/status/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => {
        this.statusOb.next(data);
      });
  }

  removeStatus(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.project}`)
  }
}
