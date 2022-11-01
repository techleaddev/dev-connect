import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {
  projectForm: FormGroup;
  constructor(
    private toast: ToastrService,
    private projectService: ProjectService
  ) {
    this.projectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      readme: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.projectService.createProject(this.projectForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toast.success('thanh cong!');
      },
      (e) => {
        console.log(e);
        const err = e.error.message;
        this.toast.error(err);
      }
    );
  }
}
