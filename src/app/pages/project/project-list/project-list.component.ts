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
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProject();
    this.projectService.projectOb.subscribe((data) => {
      data.map((item) => item.originator.name);
      this.projects = data;
    });
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
