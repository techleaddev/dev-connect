import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { ProjectType } from '../types/Project';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
Project= new ReplaySubject<any>(1);
  constructor(private http: HttpClient, private httpService: HttpService) {}
  get headers(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') as string);

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
  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }
  deleteProjectById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }
  updateProjectById(id: string,data:any): Observable<any> {
    return this.http.put<any>(`${environment.project}/${id}`,data, {
      headers: this.headers,
    });
  }
  getProject():void {
    this.http.get<any[]>(`${environment.project}`, {
      headers: this.headers,
    }).subscribe((data)=>
    this.Project.next(data)
    );
  }
}
