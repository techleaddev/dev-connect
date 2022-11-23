import { ToastrService } from 'ngx-toastr';
import { ChatService } from './../../services/chat.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectService } from './../../services/project.service';
import { CommonService } from './../../services/common.service';
import { MemberService } from './../../services/member.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-modal-add-group-chat',
  templateUrl: './modal-add-group-chat.component.html',
  styleUrls: ['./modal-add-group-chat.component.scss'],
})
export class ModalAddGroupChatComponent implements OnInit {
  hidden = true;
  display: string = '';
  members: any[] = [];
  pjId: string = '';
  memberId: any = '';

  formAddGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    projectId: new FormControl(''),
    all: new FormControl(false),
    member: new FormControl([]),
  });
  constructor(
    private memberService: MemberService,
    private commonService: CommonService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalAddGroupChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pjId: string },
    public dialog: MatDialog,
    private chatService: ChatService,
    private toast: ToastrService,
    private config: NgSelectConfig
  ) {}

  ngOnInit(): void {
    this.projectService.getProject(this.data.pjId).subscribe((data) => {
      this.formAddGroup.patchValue({
        projectId: data._id,
      });
    });

    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.pjId = id;
        this.memberService.getAllMember(this.pjId);
        this.memberService.memberOb.subscribe((data) => {
          data.map((item) => (this.memberId = item.member_id));
          this.members = data;
        });
      }
    });
  }

  change(e: any) {
    if (e.target.checked) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }
  onSubmit() {
    const newData = this.formAddGroup.value;
    this.chatService.createGroupChat(newData).subscribe(
      (data) => {
        this.toast.success('Tạo mới thành công');
        this.chatService.getAllGroupChat(this.data.pjId);
        this.dialogRef.close();
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
