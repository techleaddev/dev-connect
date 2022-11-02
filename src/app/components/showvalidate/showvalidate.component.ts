import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-showvalidate',
  templateUrl: './showvalidate.component.html',
  styleUrls: ['./showvalidate.component.scss'],
})
export class ShowvalidateComponent implements OnInit {
  @Input() field: any;
  @Input() key: string;
  constructor() {
    this.key = '';
  }

  ngOnInit(): void {}
}
