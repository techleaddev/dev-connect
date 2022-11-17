import { Status } from './../types/status';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statusOb = new ReplaySubject<any[]>(1);

  constructor(private http: HttpClient) {}

  createStatus(data: Status): Observable<Status> {
    return this.http.post<Status>(`${environment.status}/status`, data);
  }

  getAllStatus(id: string): void {
    this.http
      .get<Status[]>(`${environment.status}/status/${id}`)
      .subscribe((data) => {
        this.statusOb.next(data);
      });
  }

  removeStatus(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.status}`);
  }
}
