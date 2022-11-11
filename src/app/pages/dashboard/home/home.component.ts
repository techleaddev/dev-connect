import { Component, OnInit } from '@angular/core';
import { ProjectType } from 'src/app/types/Project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  id: string;
  formProjectDashboard: FormGroup;
  isDisableForm = true;

  constructor(
    private activatedRouter: ActivatedRoute,
    private ProjectService: ProjectService,
    private toast : ToastrService,
    private commonService:CommonService
  ) {
    (this.id = ''),
      (this.formProjectDashboard = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        readme: new FormControl('', Validators.required),
      }));
  }

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.commonService.projectId.subscribe(id => {
      if(id){
        this.id = id;
        this.ProjectService.getProjectById(this.id).subscribe((data) => {
          this.formProjectDashboard.patchValue({
            name: data.name,
            description: data.description,
            readme: data.readme,
          });
        });
      }
    })
    this.formProjectDashboard.disable();
  }
  onSubmit() {
    if(this.isDisableForm){
      return;
    }
    const submitData = this.formProjectDashboard.value;
    return this.ProjectService.updateProjectById(this.id, submitData).subscribe(
      (data) => {
        this.toast.success('Edit thành công!');
        this.onClick()
      },
      (e) => {
        console.log(e.error.message);
      }
    );
  }
  onClick(){
    if(this.isDisableForm){
      this.formProjectDashboard.enable()
    }else{
      this.formProjectDashboard.disable();

    }
    this.isDisableForm = !this.isDisableForm
  }
}
