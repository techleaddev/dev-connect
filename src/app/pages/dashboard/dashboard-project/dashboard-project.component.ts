import { Project } from './../../../types/project';
import { ProjectService } from './../../../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.scss']
})
export class DashboardProjectComponent implements OnInit {
  dbFormProject:FormGroup; 
  projectId: string;
  isDisableForm = true;
  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,

  ) {
    this.dbFormProject = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      readme: new FormControl('', [
        Validators.required
      ])
    })
    this.projectId=''
   }

   ngOnInit(): void {
     this.projectId = this.activatedRoute.snapshot.params['id']
     if(this.projectId){
      this.projectService.getProject(this.projectId).subscribe(data=>{
        this.dbFormProject.patchValue({
          name:data.name,
          description:data.description,
          readme:data.readme
        })
      })
    }
    this.dbFormProject.disable()
  }
  onSubmit(){
    if(this.isDisableForm){
      return;
    }
    const submitData = this.dbFormProject.value
    if(this.projectId !== undefined ){
      return this.projectService.updateProject(this.projectId, submitData).subscribe((data)=>{
        this.toast.success("Sửa thành công")
        this.onClick()
      }, (e)=>{
        this.toast.error(e.error.message)
      })
    }
    return this.projectService.createProject(submitData).subscribe((data)=>{
    }, (e)=>{
      this.toast.error(e.error.message)
    })
  }
  
  onClick(){
    if(this.isDisableForm){
      this.dbFormProject.enable()
    }else{
      this.dbFormProject.disable()
    }
    this.isDisableForm = !this.isDisableForm
  }
}
