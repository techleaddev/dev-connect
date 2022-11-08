import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http : HttpClient) { }
  AddMember(data: any): Observable<any> {
    return this.http.put<any>(`${environment.member}`, data);
  }
}
