import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  singupForm: FormGroup;
  constructor(private authService: AuthService, private toastr: ToastrService,private router: Router) {
    this.singupForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.authService.signup(this.singupForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Bạn đã đăng kí thành công!');
        this.router.navigateByUrl('/');
      },
      (e) => {
        const message = e.error.message;
        this.toastr.error(message);
      }
    );
  }
}
