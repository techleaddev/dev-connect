import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../services/project.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  formProject: FormGroup;

  constructor(
    private projectService: ProjectService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.formProject = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      readme: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.projectService.createProject(this.formProject.value).subscribe(
      (data) => {
        this.toast.success('Thêm thành công');
        this.projectService.getAllProject();
        this.dialogRef.close();
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
