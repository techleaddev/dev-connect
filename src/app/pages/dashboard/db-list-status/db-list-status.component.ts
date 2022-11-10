import { StatusService } from './../../../services/status.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalAddStatusComponent } from 'src/app/component/modal-add-status/modal-add-status.component';

@Component({
  selector: 'app-db-list-status',
  templateUrl: './db-list-status.component.html',
  styleUrls: ['./db-list-status.component.scss'],
})
export class DbListStatusComponent implements OnInit {
  pjId: string = '';

  status: any[] = [];
  constructor(
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private toast: ToastrService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.getAllStatus();
  }

  getAllStatus() {
    this.pjId = this.activatedRouter.snapshot.params['id'];
    this.statusService.getAllStatus(this.pjId);
    this.statusService.statusOb.subscribe((data) => {
      this.status = data;
    });
  }
  onDelete() {}

  toggleModal() {
    this.pjId = this.activatedRouter.snapshot.params['id'];
    this.dialog.open(ModalAddStatusComponent, {
      width: '30%',
      data: { pjId: this.pjId },
    });
  }
}
