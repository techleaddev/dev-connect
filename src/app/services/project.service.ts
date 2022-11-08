import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from './../types/project';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectOb = new ReplaySubject<Project[]>(1);

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
  getAllProject(): void {
    this.http
      .get<Project[]>(environment.project, { headers: this.headers })
      .subscribe((data) => {
        this.projectOb.next(data);
      });
  }

  createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.project}`, data, {
      headers: this.headers,
    });
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }

  updateProject(id: string, data: Project): Observable<Project> {
    return this.http.put<Project>(`${environment.project}/${id}`, data, {
      headers: this.headers,
    });
  }

  removeProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }
}
