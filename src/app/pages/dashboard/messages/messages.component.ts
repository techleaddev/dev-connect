import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { ModalMessagesComponent } from '../modal-messages/modal-messages.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  id = '';
  chatsAll: any = [];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.id = id;
        this.projectService.getAllChat(id);
        this.projectService.chats.subscribe((data) => {   
           console.log('data Chát',data);
          this.chatsAll = data;
        });
      }
    });
  }
  OpenPopup() {
    let dialogRef = this.dialog.open(ModalMessagesComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  }
}
