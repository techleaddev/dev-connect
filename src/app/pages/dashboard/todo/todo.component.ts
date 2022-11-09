import { ModalTodoComponent } from './../../../component/modal-todo/modal-todo.component';
import { ModalAddTagComponent } from './../../../component/modal-add-tag/modal-add-tag.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    
  }

  toggleModal() {
    this.dialog.open(ModalTodoComponent, {
      width: '30%',
    });
  }
}
