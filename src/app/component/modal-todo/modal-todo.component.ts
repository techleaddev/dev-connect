import { ToastrService } from 'ngx-toastr';
import { TodoService } from './../../services/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {
  checked = false;

  formTodo = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', []),
    deadline: new FormControl('', []),
  });
  constructor(private todoService: TodoService, private toast: ToastrService) {}

  ngOnInit(): void {}

  onSubmit() {
    const convertDate = moment(
      this.formTodo.value.deadline,
      'YYYY/MM/DD'
    ).toISOString();
    const newData = { ...this.formTodo.value, deadline: convertDate };
    const { status, ...rest } = newData;
    this.todoService.createTodo(rest).subscribe(
      (data) => {
        this.toast.success('Thêm thành công');
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
}
