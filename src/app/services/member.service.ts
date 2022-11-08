import { Observable, ReplaySubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  memberOb = new ReplaySubject<any[]>(1);

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

  addMember(data: any): Observable<any> {
    return this.http.put<any>(`${environment.member}/addMember`, data, {
      headers: this.headers,
    });
  }

  getAllMember(id: string): void {
    this.http
      .get<any>(`${environment.member}/members/${id}`, {
        headers: this.headers,
      })
      .subscribe((data) => {
        this.memberOb.next(data);
      });
  }

  removeMember(idpj: any, idmember: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.deleteMember}?projectId=${idpj}&memberId=${idmember}`,
      { headers: this.headers }
    );
  }
}
