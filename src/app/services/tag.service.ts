import { typeTag } from './../types/tag';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  tagOb = new ReplaySubject<any[]>(1);

  constructor(private http: HttpClient) {}

  createTag(data: typeTag): Observable<typeTag> {
    return this.http.post<typeTag>(`${environment.tag}/tag`, data);
  }

  getAllTag(id: string): void {
    this.http
      .get<typeTag[]>(`${environment.tag}/tag/${id}`)
      .subscribe((data) => {
        this.tagOb.next(data);
      });
  }
}
