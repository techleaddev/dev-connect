import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formSignin: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { 
    this.formSignin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.signIn(this.formSignin.value).subscribe(data=>{
      this.toast.success("Đăng nhập thành công")
      setTimeout(()=>{
        this.router.navigateByUrl('/')
      })
    }, (e)=>{
      this.toast.error( e.error.message)
    })
  }
}
