import { CommonService } from './../../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from './../../../component/modal-todo/modal-todo.component';
import { Project } from './../../../types/project';
import { ProjectService } from './../../../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.scss'],
})
export class DashboardProjectComponent implements OnInit {
  dbFormProject: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    readme: new FormControl('', [Validators.required]),
  });
  projectId: string = '';
  isDisableForm = true;
  project: any = [];
  projects: any = [];
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.initProjectId();
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.projectId = id;
        this.projectService.getProject(this.projectId).subscribe((data) => {
          this.dbFormProject.patchValue({
            name: data.name,
            description: data.description,
            readme: data.readme,
          });
        });
      }
    });

    this.dbFormProject.disable();

    this.projectService.getProject(this.projectId).subscribe((data) => {
      this.project = data;
    });

    this.projects = this.projectService.getAllProject();
    this.projectService.projectOb.subscribe((data) => {
      this.projects = data;
    });
  }

  onSubmit() {
    if (this.isDisableForm) {
      return;
    }
    const submitData = this.dbFormProject.value;
    if (this.projectId !== undefined) {
      return this.projectService
        .updateProject(this.projectId, submitData)
        .subscribe(
          (data) => {
            this.toast.success('Sửa thành công');
            this.onClick();
          },
          (e) => {
            this.toast.error(e.error.message);
          }
        );
    }
    return this.projectService.createProject(submitData).subscribe(
      (data) => {},
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }

  onClick() {
    if (this.isDisableForm) {
      this.dbFormProject.enable();
    } else {
      this.dbFormProject.disable();
    }
    this.isDisableForm = !this.isDisableForm;
  }

  clickDetail(id: string) {
    const data = JSON.parse(localStorage.getItem('Project') as string);
    data.map((item: any) => {
      item._id = id;
    });
    this.commonService.setProjectId(id);
  }

  toggleModal(item?: any) {
    this.dialog.open(ModalTodoComponent, {
      width: '30%',
      data: {
        todo: item,
      },
    });
  }
}
