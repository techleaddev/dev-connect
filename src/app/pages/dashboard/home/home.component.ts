import { Component, OnInit } from '@angular/core';
import { ProjectType } from 'src/app/types/Project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  id: string;
  formProjectDashboard: FormGroup;

  constructor(
    private activatedRouter: ActivatedRoute,
    private ProjectService: ProjectService,
    private toast : ToastrService
  ) {
    (this.id = ''),
      (this.formProjectDashboard = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        readme: new FormControl('', Validators.required),
      }));
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    if (this.id) {
      this.ProjectService.getProjectById(this.id).subscribe((data) => {
        this.formProjectDashboard.patchValue({
          name: data.name,
          description: data.description,
          readme: data.readme,
        });
      });
    }
  }
  onSubmit() {
    const submitData = this.formProjectDashboard.value;
    return this.ProjectService.updateProjectById(this.id, submitData).subscribe(
      (data) => {
        this.toast.success('Edit thành công!');
      },
      (e) => {

        console.log(e.error.message);
      }
    );
  }
}
