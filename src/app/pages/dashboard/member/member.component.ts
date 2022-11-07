import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalMemberComponent } from '../modal-member/modal-member.component';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  id: string='';
  constructor(public dialog: MatDialog, private activatedRouter: ActivatedRoute,) {
  }

  ngOnInit(): void {}
  OpenPopup() {
    this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
    
    let dialogRef = this.dialog.open(ModalMemberComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  
  }
}
