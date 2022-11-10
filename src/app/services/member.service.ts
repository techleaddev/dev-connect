import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  memberOb = new ReplaySubject<any[]>(1);

  constructor(private http: HttpClient) {}

  addMember(data: any): Observable<any> {
    return this.http.put<any>(`${environment.member}/addMember`, data);
  }

  getAllMember(id: string): void {
    this.http
      .get<any>(`${environment.member}/members/${id}`)
      .subscribe((data) => {
        this.memberOb.next(data);
      });
  }

  removeMember(idpj: any, idmember: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.deleteMember}?projectId=${idpj}&memberId=${idmember}`
    );
  }
}
