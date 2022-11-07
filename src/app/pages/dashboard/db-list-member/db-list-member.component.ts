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
  constructor(
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.getAllMember();
  }
  getAllMember() {
    this.memberService.getAllMember(this.activatedRouter.snapshot.params['id']);
    this.memberService.memberOb.subscribe((data) => {
      this.members = data;
    });
  }
  toggleModal() {
    this.pjId = this.activatedRouter.snapshot.params['id'];
    this.dialog.open(ModalAddMemberComponent, {
      width: '30%',
      data: { pjId: this.pjId },
    });
  }
}
