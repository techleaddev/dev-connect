import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    readme: new FormControl('', Validators.required),
  });;
  constructor(
    private toast: ToastrService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {}
  onSubmit() {
    this.projectService.createProject(this.projectForm.value).subscribe(
      (data) => {
        this.toast.success('thanh cong!');
        this.dialog.closeAll();
        this.projectService.getProject();
      },
      (e) => {
        const err = e.error.message;
        this.toast.error(err);
      }
    );
  }
}
