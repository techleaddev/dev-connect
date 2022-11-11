import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    0;
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

}
