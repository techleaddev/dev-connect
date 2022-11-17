import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  id = '';
  link: any = '';
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private commonService:CommonService,
  ) {}

  ngOnInit(): void {
    // this.id = localStorage.getItem('IDPJ') as string;
    // console.log('vdvdv',localStorage.getItem('IDPJ') as string);
    
    // this.link = this.router.navigateByUrl(`/common`);
    // console.log('linkrouer', this.link);
  }
  onClick(){
    this.router.navigateByUrl('/dashboard/common')
  }
}
