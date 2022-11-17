import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectType } from 'src/app/types/Project';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

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
  constructor(
    public dialog: MatDialog,
    private getProjects: ProjectService,
    private toast: ToastrService,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.Project = [];
    this.nameProject = [];
  }

  ngOnInit(): void {
    this.getProjects.getProject();
    this.getProjects.Project.subscribe((data) => {
      localStorage.setItem('prjId', JSON.stringify(data));
      this.Project = data;
      const a = data.map((o: any) => o.originator.name);
      this.nameProject = a[0];
    });
  }
  OpenPopup() {
    this.dialog.open(ModalPopupComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
  onRemove(id: string) {
    const confim = confirm('Bạn có chắc muốn xóa không?');
    if (confim && id) {
      this.getProjects.deleteProjectById(id).subscribe(() => {
        this.toast.success('Bạn đã xóa thành công!');
        this.getProjects.getProject();
      });
    }
  }
  onClickDetailProJect(id: string) {
    const idProJect = JSON.parse(localStorage.getItem('prjId') as string);
    idProJect.map((item: any) => {
      item._id = id;
    });
    this.commonService.setProjectId(id);
    this.router.navigateByUrl(`/dashboard/common`);
  }
}
