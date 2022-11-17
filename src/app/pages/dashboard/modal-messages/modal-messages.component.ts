import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-messages',
  templateUrl: './modal-messages.component.html',
  styleUrls: ['./modal-messages.component.scss'],
})
export class ModalMessagesComponent implements OnInit {
  check = true;
  formChats: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    all: new FormControl(false),
    member: new FormControl(''),
    projectId: new FormControl('', Validators.required),
  });
  memberProjects: any = [];
  id = '';
  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.commonService.initProjectId();
    this.commonService.projectId.subscribe((id) => {
      this.formChats.patchValue({ projectId: id });
      if (id) {
        console.log(id);
        this.projectService.GetMember(id);
        this.projectService.member.subscribe((data) => {
          this.memberProjects = data;
        });
      }
    });
  }
  onSubmit() {
    console.log(this.formChats.value);
    this.projectService.createGroupChat(this.formChats.value).subscribe(
      (data) => {
        this.toast.success('thanh cong');
        this.dialog.closeAll();
      },
      (e) => {
        console.log(e);
        
      }
    );
  }
  // onChange(e:any){
  //     if(e.target.checked){
  //       this.check= false;
  //     }else{
  //       this.check= true;
  //     }
  // }
}
