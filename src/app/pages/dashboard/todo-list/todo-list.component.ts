import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {}
  OpenPopup() {
    let dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      // data: { id: this.id },
    });
  }
}
