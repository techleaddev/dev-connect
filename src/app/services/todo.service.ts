import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoOb = new ReplaySubject<any[]>(1);
  constructor(private http: HttpClient) {}
  createTodo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.todo}`, data);
  }

  getAllToDo(): void {
    this.http.get<any[]>(`${environment.todo}?searchKey=`).subscribe((data) => {
      this.todoOb.next(data);
    });
  }

  removeTodo(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.todo}/${id}`);
  }

  updateTodo(data: any): Observable<any> {
    return this.http.put<any>(`${environment.todo}`, data);
  }

  // getTodo(id: string): Observable<string> {
  //   return this.http.get<string>(`${environment.todo}`);
  // }
}
