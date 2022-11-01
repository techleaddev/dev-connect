import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data));
        this.toastr.success('Bạn đã đăng nhập thành công');
      },
      (e) => {
        const message = e.error.message;
        this.toastr.error(message);
      }
    );
  }
}
