import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  projectId = new ReplaySubject<string>(1);

  setProjectId(id: string) {
    localStorage.setItem('IDPJ', id);
  }

  initProjectId(): void {
    const projectId = localStorage.getItem('IDPJ');
    this.projectId.next(projectId || '');
  }
}
