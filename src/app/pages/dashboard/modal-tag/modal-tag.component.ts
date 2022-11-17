import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-tag',
  templateUrl: './modal-tag.component.html',
  styleUrls: ['./modal-tag.component.scss'],
})
export class ModalTagComponent implements OnInit {
  addTagForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    projectId: new FormControl(''),
  });
  member: any = [];
  id = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ProjectService: ProjectService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.ProjectService.getProjectById(this.data.id).subscribe((data) => {
        this.addTagForm.patchValue({
          projectId: data._id,
        });
      });
    }
    this.ProjectService.getTag(this.data.id);
  }

  onSubmit() {
    this.ProjectService.AddTag(this.addTagForm.value).subscribe(
      (data) => {
        this.toast.success('success');
        this.dialog.closeAll();
        this.ProjectService.getTag(this.data.id);
      },
      (e) => {
        this.toast.success(e.error.message);
      }
    );
  }
}
