import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/component/modal/modal.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router:Router,
  ) { }

  ngOnInit(): void {
    const isToken= JSON.parse(localStorage.getItem("user") as string)
    if(isToken){
      this.router.navigateByUrl('/')
    }else{
      this.router.navigateByUrl('/signin')
    }
  }
  toggleModal(){
    this.dialog.open(ModalComponent, {
      width:"50%"
    })
  }
}
