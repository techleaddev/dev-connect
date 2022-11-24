import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private httpService: HttpService) {}
  chatContent = new ReplaySubject<any>(1);
  get headers(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') as string);

    const config = new HttpHeaders({
      Accept: 'application/json ',
      'Content-Type': 'application/json',
      'x-auth-token': token.token,
    });
    return config;
  }
  chatPost(data: any): Observable<any> {
    return this.http.post<any>(`${environment.chatPost}`, data, {
      headers: this.headers,
    });
  }
  getAllChatContent(id:string): void {
    this.http
      .get<[]>(`${environment.chatPost}/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => this.chatContent.next(data));
  }
}
