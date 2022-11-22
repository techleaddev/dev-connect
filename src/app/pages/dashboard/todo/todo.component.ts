import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoService } from './../../../services/todo.service';
import { ModalTodoComponent } from './../../../component/modal-todo/modal-todo.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todo: any[] = [];
  todoId: string = '';
  number: number = 0;
  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private toast: ToastrService
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todo, event.previousIndex, event.currentIndex);

    const todoIdOb = {
      id: this.todoId,
      newNumber: this.number,
    };
    this.todoService.changeTodo(todoIdOb).subscribe(
      (data) => {
        this.toast.success('DONE');
      },
      (e) => {
        this.toast.error(e.error.message);
      }
    );
  }
  ngOnInit(): void {
    this.getAllTodo();
  }

  getAllTodo() {
    this.todoService.getAllToDo();
    this.todoService.todoOb.subscribe((data) => {
      data.map((item) => {
        item.deadline = moment(item.deadline, 'YYYY/MM/DD').calendar();
        this.todoId = item._id;
        this.number = item.number;
      });
      this.todo = data;
    });
  }

  onDelete(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xóa không?');
    if (confirmDelete && id) {
      this.todoService.removeTodo(id).subscribe(
        (data) => {
          this.toast.success('Xóa thành công');
          this.todoService.getAllToDo();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }

  onCheckBox(id: string, status: boolean) {
    const checked = {
      id: id,
      status: (status = !status),
    };
    this.todoService.updateTodoStatus(checked).subscribe((data) => {
      if (data.status == true) {
        this.toast.success('Done');
        this.todoService.getAllToDo();
      } else {
        this.toast.warning('Todo');
        this.todoService.getAllToDo();
      }
    });
  }
  toggleModal(item?: any) {
    this.dialog.open(ModalTodoComponent, {
      width: '30%',
      data: {
        todo: item,
      },
    });
  }
}
