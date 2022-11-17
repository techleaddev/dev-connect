import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './../../../services/chat.service';
import { CommonService } from './../../../services/common.service';
import { ModalAddGroupChatComponent } from './../../../component/modal-add-group-chat/modal-add-group-chat.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  formMessage: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
  pjId: string = '';
  groupChat: any = [];
  chatContent: any = [];
  conversationId = '';
  userId = '';
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private chatService: ChatService,
    private socket: Socket,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.socket.fromEvent('new_message').subscribe((data: any) => {
      this.chatService.getChatContent(data._id);
    });
    this.getAllGroupChat();
    this.someMethod();
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

  onClickMessage(id: string) {
    this.chatService.getChatContent(id);
    this.chatService.ChatOb.subscribe((data: any) => {
      this.chatContent = data.messages;
      data.messages.map((item: any) => {
        item.date = moment(item.date).format('hh:mm DD/MM');
      });
      this.conversationId = data._id;
    });
    this.socket.emit('connect_room', id);
  }
  onSubmit() {
    const newData = {
      ...this.formMessage.value,
      conversationId: this.conversationId,
    };
    this.chatService.sendMessage(newData).subscribe((data) => {
      this.chatService.getChatContent(this.conversationId);
    });
    this.formMessage.reset();
  }

  someMethod() {
    const token = this.jwtHelper.decodeToken(
      localStorage.getItem('user') as string
    );
    this.userId = token.id;
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
