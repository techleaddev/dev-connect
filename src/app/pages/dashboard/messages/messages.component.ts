import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { ModalMessagesComponent } from '../modal-messages/modal-messages.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  id = '';
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.commonService.projectId.subscribe((id) => {
      this.id = id;
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
