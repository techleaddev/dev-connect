import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.scss'],
})
export class ModalMemberComponent implements OnInit {
  check = 0;
  AddmemberForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    projectId: new FormControl(''),
  });
  member: any = [];
  id: string;
  constructor(
    private ProjectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private toast: ToastrService,
    public dialog: MatDialog
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.ProjectService.getProjectById(this.data.id).subscribe((data) => {
        this.AddmemberForm.patchValue({
          projectId: data._id,
        });
      });
    }
    this.ProjectService.GetMember(this.data.id);
  }

  onSubmit() {
    this.check=1; 
    this.ProjectService.AddMember(this.AddmemberForm.value).subscribe(
      (data) => {
        this.toast.success('thanh cong!');
        this.dialog.closeAll();
        this.ProjectService.getProject();
        this.ProjectService.GetMember(this.data.id);
        this.check=0;
        // this.AddmemberForm.controls['email'].reset();
      },
      (e) => {
        const err = e.error.message;
        
        this.toast.error(err);
      }
    );
  }
}
