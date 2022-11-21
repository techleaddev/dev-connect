import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  item = [];
  title = '';
  titleButton = '';
  addTodoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    status: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { toDoLists: any },
    private projectService: ProjectService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService.getToDo();
    this.addTodoForm.patchValue({ ...this.data.toDoLists });
    if (!this.data.toDoLists) {
      this.title = 'Create Todo';
      this.titleButton = 'Add';
    } else {
      this.title = 'Edit Todo';
      this.titleButton = 'Edit';
    }
  }
  onSubmit() {
    if (this.data.toDoLists) {
      const dataEditTodo = {
        ...this.addTodoForm.value,
        id: this.data.toDoLists._id,
      };
      this.projectService.updateTodo(dataEditTodo).subscribe(
        () => {
          this.toast.success('thanh cong');
          this.dialog.closeAll();
          this.projectService.getToDo();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    } else {
      const newDate = moment(
        this.addTodoForm.value.deadline,
        'YYYY/MM/DD'
      ).toISOString();
      const newData = { ...this.addTodoForm.value, deadline: newDate };
      const { status, ...rest } = newData;
      this.projectService.addToDo(rest).subscribe(
        (data) => {
          this.toast.success('Thành công');
          this.dialog.closeAll();
          this.projectService.getToDo();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }
}
