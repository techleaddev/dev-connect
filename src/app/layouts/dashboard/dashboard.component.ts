import { Users } from './../../types/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo: any;
  constructor(private router: Router, private user: AuthService) {}

  ngOnInit(): void {
    this.user.getUserInFo().subscribe((data: any) => {
      this.userInfo = data;
    });
  }

  onClick() {
    this.router.navigateByUrl('/dashboard/detail');
  }
  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/signin');
  }
}
