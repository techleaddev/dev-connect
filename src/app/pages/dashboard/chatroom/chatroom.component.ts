import { ChatService } from './../../../services/chat.service';
import { CommonService } from './../../../services/common.service';
import { ModalAddGroupChatComponent } from './../../../component/modal-add-group-chat/modal-add-group-chat.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  pjId: string = '';
  groupChat: any[] = [];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.getAllGroupChat();
  }

  getAllGroupChat() {
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.pjId = id;
      }
      this.chatService.getAllGroupChat(this.pjId);
      this.chatService.groupChatOb.subscribe((data) => {
        this.groupChat = data;
      });
    });
  }
  toggleModal() {
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.pjId = id;
      }
    });
    this.dialog.open(ModalAddGroupChatComponent, {
      width: '30%',
      data: { pjId: this.pjId },
    });
  }
}
