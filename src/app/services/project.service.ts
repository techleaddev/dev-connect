import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { ProjectType } from '../types/Project';
import { statusType, statusTypeResponse } from '../types/Status';
import { MemberType } from '../types/Member';
import { TagType } from '../types/Tag';
import { toDoType } from '../types/todo';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  Project = new ReplaySubject<any>(1);
  member = new ReplaySubject<any>(1);
  status = new ReplaySubject<any>(1);
  tag = new ReplaySubject<any>(1);
  todo = new ReplaySubject<any>(1);

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
  createProject(data: ProjectType): Observable<ProjectType> {
    return this.http.post<ProjectType>(`${environment.project}`, data, {
      headers: this.headers,
    });
  }
  getProjectById(id: string): Observable<ProjectType> {
    return this.http.get<ProjectType>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }
  deleteProjectById(id: string): Observable<ProjectType> {
    return this.http.delete<ProjectType>(`${environment.project}/${id}`, {
      headers: this.headers,
    });
  }
  updateProjectById(id: string, data: ProjectType): Observable<ProjectType> {
    return this.http.put<ProjectType>(`${environment.project}/${id}`, data, {
      headers: this.headers,
    });
  }
  getProject(): void {
    this.http
      .get<[]>(`${environment.project}`, {
        headers: this.headers,
      })
      .subscribe((data) => this.Project.next(data));
  }

  // Member
  AddMember(data: MemberType): Observable<MemberType> {
    return this.http.put<MemberType>(`${environment.member}`, data, {
      headers: this.headers,
    });
  }
  GetMember(id: string): void {
    this.http
      .get<[]>(`${environment.getmember}/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => this.member.next(data));
  }
  deleteMemberById(
    projectId: string,
    memberId: string
  ): Observable<MemberType> {
    return this.http.delete<MemberType>(
      `${environment.projectMember}/member?projectId=${projectId}&memberId=${memberId}`,
      {
        headers: this.headers,
      }
    );
  }
  // Status
  AddStatus(data: statusType): Observable<statusType> {
    return this.http.post<statusTypeResponse>(
      `${environment.project}/status`,
      data,
      {
        headers: this.headers,
      }
    );
  }
  getStatus(id: string): void {
    this.http
      .get<[]>(`${environment.project}/status/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => this.status.next(data));
  }
  // tag

  AddTag(data: TagType): Observable<TagType> {
    return this.http.post<TagType>(`${environment.project}/tag`, data, {
      headers: this.headers,
    });
  }
  getTag(id: string): void {
    this.http
      .get<[]>(`${environment.project}/tag/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => this.tag.next(data));
  }
  //ToDo
  addToDo(data: toDoType): Observable<toDoType> {
    return this.http.post<toDoType>(`${environment.todo}`, data, {
      headers: this.headers,
    });
  }
  getToDo(): void {
    this.http
      .get<[]>(`${environment.todo}?searchKey=`, {
        headers: this.headers,
      })
      .subscribe((data) => this.todo.next(data));
  }
  deleteTodoById(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.todo}/${id}`, {
      headers: this.headers,
    });
  }
  updateTodo(data: toDoType): Observable<toDoType> {
    return this.http.put<toDoType>(`${environment.todo}`, data, {
      headers: this.headers,
    });
  }
}
