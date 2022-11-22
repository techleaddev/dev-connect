import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  toDoLists: any = [];
  idEdit = '';
  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.projectService.getToDo();
    this.projectService.todo.subscribe((data) => {
      data.map((item: any) => {
        item.deadline = moment(item.deadline, 'YYYY/MM/DD').calendar();
        this.idEdit = item._id;
      });
      this.toDoLists = data;
    });
  }
  OpenPopup(item: any) {
    let dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { toDoLists: item },
    });
  }
  onRemove(id: string) {
    if (confirm('Bạn có muốn xóa không ?')) {
      this.projectService.deleteTodoById(id).subscribe(
        () => {
          this.toast.success('thành công');
          this.projectService.getToDo();
        },
        (e) => {
          this.toast.error(e.error.message);
        }
      );
    }
  }
  onPut(id: string, status: boolean) {
    if (status == true) {
      const dataTodo = { id: id, status: false };
      this.projectService.todoCheckBox(dataTodo).subscribe(
        (data) => {
           this.projectService.getToDo();
        },
        (e) => {
          this.toast.error(e.error.messages);
         
        }
      );
    } else if (status == false) {
      const dataTodo = { id: id, status: true };
      this.projectService.todoCheckBox(dataTodo).subscribe(
        (data) => { 
          this.projectService.getToDo();
        },
        (e) => {
          this.toast.error(e.error.messages);
         
        }
      );
    }
   
  }
}
