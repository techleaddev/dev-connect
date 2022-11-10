import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {
  check = false;
  addTodoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    status: new FormControl(''),
  });
  constructor(
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    const newDate = moment(
      this.addTodoForm.value.deadline,
      'YYYY/MM/DD'
    ).toISOString();
    const newData = { ...this.addTodoForm.value, deadline: newDate };
    const { status, ...rest } = newData;

    this.projectService.addToDo(rest).subscribe(
      (data) => {
        this.toast.success('Thành công');
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
