import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  projectId = new ReplaySubject<string>(1);
  idGroup = new ReplaySubject<string>(1);

  setProjectId(id: string) {
    localStorage.setItem('IDPJ', id);
    this.projectId.next(id);
  }

  initProjectId(): void {
    const projectId = localStorage.getItem('IDPJ');
    this.projectId.next(projectId || '');
  }
  setGroupId(id: string) {
    localStorage.setItem('idGroup', id);
    this.idGroup.next(id);
  }

  initGroupId(): void {
    const groupId = localStorage.getItem('idGroup');
    this.idGroup.next(groupId || '');
  }
}
