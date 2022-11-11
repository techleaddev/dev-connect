import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  projectId = new ReplaySubject<string>(1);

  setProjectId(id: string) {
    localStorage.setItem('IdPr', id);
  }

  initProjectId(): void {
    const projectId = localStorage.getItem('IdPr');
    this.projectId.next(projectId || '');
  }
}
