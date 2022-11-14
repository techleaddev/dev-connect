import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.isLoading=true;
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        this.toastr.success('Bạn đã đăng nhập thành công');
        this.router.navigateByUrl('/welcome');
        this.isLoading=false;
      },
      (e) => {
        const message = e.error.message;
        this.toastr.error(message);
        this.isLoading=false;
      }
    );
  }
}
