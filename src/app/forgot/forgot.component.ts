import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../services/forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {



  constructor() {

  }

  ngOnInit(): void {

  }
}
