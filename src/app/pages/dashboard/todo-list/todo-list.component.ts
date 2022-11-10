import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as moment from 'moment';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  toDoLists: any = [];
  constructor(
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {0
    this.projectService.getToDo();
    this.projectService.todo.subscribe((data) => {
      data.map((item: any) => {
        item.deadline = moment(item.deadline, 'YYYY/MM/DD').calendar();
      });
      this.toDoLists = data;
    });
  }
  OpenPopup() {
    let dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      // data: { id: this.id },
    });
  }
}
