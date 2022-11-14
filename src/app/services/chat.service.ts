import { environment } from 'src/environments/environment';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  groupChatOb = new ReplaySubject<[]>(1);

  constructor(private http: HttpClient) {}

  createGroupChat(data: any): Observable<any> {
    return this.http.post<any>(`${environment.chat}/group`, data);
  }

  getAllGroupChat(id: string): void {
    this.http
      .get<any>(`${environment.chat}?projectId=${id}`)
      .subscribe((data) => {
        this.groupChatOb.next(data);
      });
  }
}
