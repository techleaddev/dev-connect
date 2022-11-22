import { StatusService } from './../../services/status.service';
import { ProjectService } from './../../services/project.service';
import { FormBuilder } from '@angular/forms';
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
  selector: 'app-modal-add-status',
  templateUrl: './modal-add-status.component.html',
  styleUrls: ['./modal-add-status.component.scss'],
})
export class ModalAddStatusComponent implements OnInit {
  status: [] = [];
  pjId: string = '';
  formAddStatus: FormGroup = this.fb.group({
    projectId: [''],
    statusData: this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      color: ['', Validators.required],
    }),
  });

  disableButton: boolean = false;
  constructor(
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ModalAddStatusComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { pjId: string },
    public dialog: MatDialog,
    private fb: FormBuilder,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.projectService.getProject(this.data.pjId).subscribe((data: any) => {
      this.formAddStatus.patchValue({
        projectId: data._id,
      });
    });
  }
  onSubmit() {
    this.disableButton = true;
    this.statusService.createStatus(this.formAddStatus.value).subscribe(
      (data) => {
        this.toast.success('Thêm thành công');
        this.statusService.getAllStatus(this.data.pjId);
        this.dialogRef.close();
        this.disableButton = false;
      },
      (e) => {
        this.toast.error(e.error.message);
        console.log(e);
      }
    );
  }
}
