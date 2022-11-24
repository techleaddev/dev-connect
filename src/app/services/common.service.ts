import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  projectId = new ReplaySubject<string>(1);
  groupChatId = new ReplaySubject<string>(1);
  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  setProjectId(id: string) {
    localStorage.setItem('IdPr', id);
    this.projectId.next(id);
  }

  initProjectId(): void {
    const projectId = localStorage.getItem('IdPr');
    this.projectId.next(projectId || '');
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }

  setGroupChatId(id: string) {
    localStorage.setItem('idGroupChat', id);
    this.groupChatId.next(id);
  }

  initGroupChatId(): void {
    const groupChatId = localStorage.getItem('idGroupChat');
    this.groupChatId.next(groupChatId || '');
  }
}
