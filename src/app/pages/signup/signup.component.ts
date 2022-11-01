import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup:FormGroup

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) { 
    this.formSignup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
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
    this.authService.signUp(this.formSignup.value).subscribe(data=> {
      this.toast.success("Đăng kí thành công")
      setTimeout(()=>{
        this.router.navigateByUrl('/signin')
      }, 2000)
    }, (e)=>{
      
      this.toast.error(e.error.message)
    })
  }
}
