import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalTagComponent } from '../modal-tag/modal-tag.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  id: string = '';
  tags: any = [];

  constructor(
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.projectService.getTag(this.id);
    this.projectService.tag.subscribe((data) => {
      console.log('tag',data);
      
      this.tags = data;
    });
  }
  OpenPopup() {
    let dialogRef = this.dialog.open(ModalTagComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { id: this.id },
    });
  }
  onRemove(){

  }
}
