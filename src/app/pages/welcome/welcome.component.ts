import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectType } from 'src/app/types/Project';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  Project: ProjectType[];
  nameProject: string[];
  constructor(public dialog: MatDialog, private getProjects: ProjectService) {
    this.Project = [];
    this.nameProject = [];
  }

  ngOnInit(): void {
    this.getProjects.getProject().subscribe((data) => {
      this.Project = data;
      console.log(data);
      const a = data.map((o) => o.originator.name);
      
      this.nameProject =a[0];
      console.log();
    });
  }
  OpenPopup() {
    this.dialog.open(ModalPopupComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
}
