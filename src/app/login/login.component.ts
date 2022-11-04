import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {SigninService} from '../services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formSignIn = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private signinService : SigninService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.formSignIn.value);
    this.signinService.sendPost(this.formSignIn.value).subscribe(result => console.log(result), error => console.log(error));
  }

}
