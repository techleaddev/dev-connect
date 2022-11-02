import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from './../types/project';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  get headers(): HttpHeaders {
    const { token } = JSON.parse(localStorage.getItem('user') as string) 
    const config = new HttpHeaders({
      Accept: 'application/json ',
      'Content-Type': 'application/json',
      'x-auth-token': token,
    });
    return config;
  }

  constructor(private http: HttpClient) { }

  getAllProject(): Observable<Project[]>{
    return this.http.get<Project[]>(environment.project, {headers:this.headers})
  }

  createProject(data:Project):Observable<Project>{
    return this.http.post<Project>(`${environment.project}`, data, {headers:this.headers})
  }
}
