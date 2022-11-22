import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../services/project.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TagService } from './../../services/tag.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-tag',
  templateUrl: './modal-add-tag.component.html',
  styleUrls: ['./modal-add-tag.component.scss'],
})
export class ModalAddTagComponent implements OnInit {
  pjId: string = '';
  tags: any = [];
  formAddTag: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    projectId: new FormControl('', []),
  });
  disableButton: boolean = false;
  constructor(
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { pjId: string },
    public dialog: MatDialog,
    private projectService: ProjectService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ModalAddTagComponent>
  ) {}

  ngOnInit(): void {
    this.projectService.getProject(this.data.pjId).subscribe((data: any) => {
      this.formAddTag.patchValue({
        projectId: data._id,
      });
    });
  }

  onSubmit() {
    this.disableButton = true;
    this.tagService.createTag(this.formAddTag.value).subscribe(
      (data) => {
        this.toast.success('Thêm thành công');
        this.tagService.getAllTag(this.data.pjId);
        this.dialogRef.close();
        this.disableButton = false;
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
