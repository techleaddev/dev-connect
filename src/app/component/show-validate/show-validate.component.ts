import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-validate',
  templateUrl: './show-validate.component.html',
  styleUrls: ['./show-validate.component.scss']
})
export class ShowValidateComponent implements OnInit {

  @Input() field:any
  @Input() key:string
  constructor() {
    this.key=''
   }

  ngOnInit(): void {
  }

}
