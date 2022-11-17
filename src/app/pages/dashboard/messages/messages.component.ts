import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { ModalMessagesComponent } from '../modal-messages/modal-messages.component';
import io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from 'src/app/services/chats.service';
const SOCKET_ENDPOINT = 'https://dev-connect-rest-api.herokuapp.com/chat';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  id = '';
  tokenIdGroup = '';
  idGroupContent = '';
  chatsAll: any = [];
  chatsAllContent: any = [];
  message!: string;
  groupId = '';
  dateChat = '';
  formchatInput: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private projectService: ProjectService,
    private socket: Socket,
    private chatservice: ChatService,
    private jwtHelper: JwtHelperService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {

    this.commonService.initProjectId();
    this.commonService.initGroupId();
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.id = id;
        this.projectService.getAllChat(id);
        this.projectService.chats.subscribe((data) => {
          this.chatsAll = data;
        });
      }
    });
    this.commonService.idGroup.subscribe((id) => {
      if (id) {
        this.idGroupContent = id;
        this.formchatInput.patchValue({
          conversationId: id,
        });
        this.socket.emit('connect_room', id);

        this.chatService.getAllChatContent(id);
        this.chatService.chatContent.subscribe((data) => {
          data.messages.map((item: any) => {
            item.date = moment(item.date).format('DD/MM hh:mm');
          });
          this.chatsAllContent = data.messages;
        });
      }
    });
    this.getMessage();
    this.someMethod();
  }

  someMethod() {
    const token = this.jwtHelper.decodeToken(
      localStorage.getItem('token') as string
    );
    this.tokenIdGroup = token.id;
  }
  sendMSG() {
    const chatData = {
      ...this.formchatInput.value,
      conversationId: this.idGroupContent,
    };
    this.chatservice.chatPost(chatData).subscribe((data) => {
      this.chatService.getAllChatContent(this.idGroupContent);

      this.formchatInput.reset();
    });
  }
  getMessage() {
    // return this.socket.on('new_message',(data:string)=>{
    // });
    // .pipe(map((data: any) => console.log(data.messages)));
    this.socket.fromEvent('new_message').subscribe((data: any) => {
      this.chatService.getAllChatContent(data._id);
      // data.messages.map((item: any) => {
      //   this.dateChat = moment(item.date).format('DD/MM hh:mm');
      //   console.log(this.dateChat);
      // });
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
  onClickId(id: string) {
    this.groupId = id;
    this.idGroupContent = id;
    this.commonService.setGroupId(id);
  }
}
