import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { ModalAddMemberComponent } from './../../../component/modal-add-member/modal-add-member.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-list-member',
  templateUrl: './db-list-member.component.html',
  styleUrls: ['./db-list-member.component.scss'],
})
export class DbListMemberComponent implements OnInit {
  pjId: string = '';
  members: any[] = [];
  memberId: any = '';
  constructor(
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private memberService: MemberService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMember();
  }
  getAllMember() {
    this.pjId = this.activatedRouter.snapshot.params['id'];
    this.memberService.getAllMember(this.pjId);
    this.memberService.memberOb.subscribe((data) => {
      data.map((item) => (this.memberId = item.member_id));
      this.members = data;
    });
  }
  onDelete() {
    const confirmDelete = confirm('Bạn có chắc chắn xóa không?');
    if (confirmDelete) {
      this.memberService.removeMember(this.pjId, this.memberId).subscribe(
        (data) => {
          this.toast.success('Xóa thành công');
          this.memberService.getAllMember(this.pjId);
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }
  toggleModal() {
    this.pjId = this.activatedRouter.snapshot.params['id'];
    this.dialog.open(ModalAddMemberComponent, {
      width: '30%',
      data: { pjId: this.pjId },
    });
  }
}
