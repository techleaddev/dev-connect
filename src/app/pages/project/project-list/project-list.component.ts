import { CommonService } from './../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../../services/project.service';
import { Project } from './../../../types/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private toast: ToastrService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProject();
    this.projectService.projectOb.subscribe((data) => {
      localStorage.setItem('Project', JSON.stringify(data));
      data.map((item) => item.originator.name);
      this.projects = data;
    });
  }

  navigate(id: any) {
    const data = JSON.parse(localStorage.getItem('Project') as string);
    data.map((item: any) => {
      item._id = id;
    });
    this.commonService.setProjectId(id);
    this.router.navigateByUrl(`/dashboard/detail`);
  }
  onDelete(id: any) {
    const confirmDelete = confirm('Bạn có chắc chắn xóa không?');
    if (confirmDelete && id) {
      this.projectService.removeProject(id).subscribe(
        (data) => {
          this.toast.success('Xóa thành công');
          this.projectService.getAllProject();
          this.projectService.projectOb.subscribe;
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }
}
