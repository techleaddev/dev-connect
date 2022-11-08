import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalMemberComponent } from '../modal-member/modal-member.component';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  id: string = '';
  member: any = [];
  constructor(
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.projectService.GetMember(this.id);
    this.projectService.member.subscribe((data) => {
      this.member = data;
    });
  }
  OpenPopup() {
    this.id = this.activatedRouter.snapshot.params['id'];
    let dialogRef = this.dialog.open(ModalMemberComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  }
}
