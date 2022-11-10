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

  constructor(private http: HttpClient) {}
  getAllProject(): void {
    this.http.get<Project[]>(environment.project).subscribe((data) => {
      this.projectOb.next(data);
    });
  }

  createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.project}`, data);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${environment.project}/${id}`);
  }

  updateProject(id: string, data: Project): Observable<Project> {
    return this.http.put<Project>(`${environment.project}/${id}`, data);
  }

  removeProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${environment.project}/${id}`);
  }
}
