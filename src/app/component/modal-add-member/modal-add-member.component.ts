import { ProjectService } from './../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from './../../services/member.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-member',
  templateUrl: './modal-add-member.component.html',
  styleUrls: ['./modal-add-member.component.scss'],
})
export class ModalAddMemberComponent implements OnInit {
  formAddMember: FormGroup;
  pjId: string = '';
  members: any[] = [];
  constructor(
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ModalAddMemberComponent>,
    private memberService: MemberService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { pjId: string },
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.formAddMember = new FormGroup({
      email: new FormControl('', [Validators.required]),
      projectId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.projectService.getProject(this.data.pjId).subscribe((data) => {
      this.formAddMember.patchValue({
        projectId: data._id,
      });
    });
  }

  onSubmit() {
    this.memberService.addMember(this.formAddMember.value).subscribe(
      (data) => {
        this.toast.success('Thêm thành công');
        this.memberService.getAllMember(this.activatedRoute.snapshot.params['id']);
        this.dialogRef.close();
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
