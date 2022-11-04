import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignupService } from '../services/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {
  formSignUp = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private signupService : SignupService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.formSignUp.value);
    this.signupService.sendPost(this.formSignUp.value).subscribe(result => console.log(result), error => console.log(error));
  }
}

