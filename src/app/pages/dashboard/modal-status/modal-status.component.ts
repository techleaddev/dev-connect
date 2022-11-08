import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-status',
  templateUrl: './modal-status.component.html',
  styleUrls: ['./modal-status.component.scss'],
})
export class ModalStatusComponent implements OnInit {
  addStatusForm = new FormGroup({
    name: new FormControl(''),
    color: new FormControl(''),
    description: new FormControl(''),
  });
  id = '';
  constructor(
    private projectService: ProjectService,
    private toast: ToastrService,
    private dialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.projectService.getProjectById(this.data.id).subscribe((data) => {
        this.id = data._id;
      });
    }
  }
  onSubmit() {
    const newObj = { statusData: this.addStatusForm.value, projectId: this.id };

    this.projectService.AddStatus(newObj).subscribe(
      (data) => {
        this.toast.success('Bạn đã thêm thành công');
        this.dialog.closeAll();
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
