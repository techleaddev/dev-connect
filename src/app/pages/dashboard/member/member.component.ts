import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
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
  memberId: any;
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
        this.id=id;
        this.projectService.GetMember(id);
        this.projectService.member.subscribe((data) => {
          this.member = data;
          data.map((item: any) => {
            this.memberId = item.member_id;
          });
        });
      }
    });
  }
  OpenPopup() {
 
    let dialogRef = this.dialog.open(ModalMemberComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  }
  onRemove() {
    if (confirm('Bạn có muốn xóa không ?')) {
      this.projectService
        .deleteMemberById(this.id, this.memberId)
        .subscribe(() => {
          this.toast.success('Bạn đã xóa thành công!');
          this.projectService.GetMember(this.id);
        });
    }
  }
}
