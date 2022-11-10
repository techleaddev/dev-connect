import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSignup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private fb: FormBuilder, private SignupService: SignupService) {
    this.formSignup = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }
  signup() {
    const data = this.formSignup.value;
    this.SignupService.signup(data).subscribe(res => { alert('Login successful!') }, err => { alert(err) });
  }
}
