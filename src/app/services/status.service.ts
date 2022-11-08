import { environment } from './../../environments/environment.prod';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statusOb = new ReplaySubject<any[]>(1);

  constructor(private http: HttpClient) {}

  createStatus(data: any): Observable<any> {
    return this.http.post<any>(`${environment.project}/status`, data);
  }

  getAllStatus(id: string): void {
    this.http
      .get<any[]>(`${environment.project}/status/${id}`)
      .subscribe((data) => {
        this.statusOb.next(data);
      });
  }

  removeStatus(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.project}`);
  }
}
