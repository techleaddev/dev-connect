import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../services/project.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formProject: FormGroup
  constructor(
    private projectService: ProjectService,
    private toast : ToastrService,
    private router: Router,
  ) {
    this.formProject = new FormGroup({
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
   }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.projectService.createProject(this.formProject.value).subscribe(data=>{
      this.toast.success("Thêm thành công")
      window.location.reload()
    }, (e)=>{
      this.toast.error(e.error.message)
    })
  }
}
