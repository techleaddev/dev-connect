import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { ModalStatusComponent } from '../modal-status/modal-status.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  id: string = '';
  status: any = [];
  constructor(
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService,
    private toast: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.id = id;
        this.projectService.getStatus(this.id);
        this.projectService.status.subscribe((data) => {
          this.status = data;
        });
      }
    });
  }
  OpenPopup() {
    let dialogRef = this.dialog.open(ModalStatusComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  }
  onRemove(id: string) {}
}
