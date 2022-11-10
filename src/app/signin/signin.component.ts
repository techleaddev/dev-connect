import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {
  formSignin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private fb: FormBuilder, private signinservice: SigninService) {
    this.formSignin = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  
  signin() {
    const data = this.formSignin.value;
    this.signinservice.signin(data).subscribe(res => { alert('Login successful!') }, err => { alert("Thông tin điền bị thiếu hoặc sai") });
  }
  onLogin(){
  }

}

