import { ProjectService } from './../../../services/project.service';
import { Project } from './../../../types/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[]=[]

  constructor(private projectService: ProjectService) { 
  }

  ngOnInit(): void {
    this.projectService.getAllProject().subscribe(data=>{
      data.map(item=> item.originator.name)
      this.projects = data
    })
  }
}
