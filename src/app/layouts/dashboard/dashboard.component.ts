import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
id ='';
  constructor(  private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
    
  }

}
