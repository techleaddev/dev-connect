import { TodoType, changeTodo } from './../types/todo';
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
  createTodo(data: TodoType): Observable<TodoType> {
    return this.http.post<TodoType>(`${environment.todo}`, data);
  }

  getAllToDo(): void {
    this.http
      .get<TodoType[]>(`${environment.todo}?searchKey=`)
      .subscribe((data) => {
        this.todoOb.next(data);
      });
  }

  removeTodo(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.todo}/${id}`);
  }

  updateTodo(data: TodoType): Observable<TodoType> {
    return this.http.put<TodoType>(`${environment.todo}`, data);
  }

  changeTodo(data: changeTodo): Observable<changeTodo> {
    return this.http.put<changeTodo>(`${environment.todo}/index`, data);
  }
}
