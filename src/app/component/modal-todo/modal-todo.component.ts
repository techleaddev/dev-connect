import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from './../../services/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {
  title: string = '';
  button: string = '';

  formTodo: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', []),
    deadline: new FormControl('', []),
  });
  constructor(
    private todoService: TodoService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ModalTodoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { todo: any }
  ) {}

  ngOnInit(): void {
    this.formTodo.patchValue({
      ...this.data.todo,
    });

    if (this.data.todo) {
      (this.title = 'UPDATE TODO'), (this.button = 'UPDATE');
    } else {
      (this.title = 'CREATE TODO'), (this.button = 'ADD');
    }
  }

  onSubmit() {
    if (!this.data.todo) {
      const convertDate = moment(
        this.formTodo.value.deadline,
        'YYYY/MM/DD'
      ).toISOString();
      const newData = { ...this.formTodo.value, deadline: convertDate };
      const { status, ...rest } = newData;
      this.todoService.createTodo(rest).subscribe(
        (data) => {
          this.toast.success('Thêm thành công');
          this.todoService.getAllToDo();
          this.dialogRef.close();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    } else {
      const dataTodo = { ...this.formTodo.value, id: this.data.todo._id };
      this.todoService.updateTodo(dataTodo).subscribe(
        (data) => {
          this.toast.success('Sửa thành công');
          this.todoService.getAllToDo();
          this.dialogRef.close();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }
}
