import { CommonService } from './../../../services/common.service';
import { TagService } from './../../../services/tag.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalAddTagComponent } from './../../../component/modal-add-tag/modal-add-tag.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-list-tag',
  templateUrl: './db-list-tag.component.html',
  styleUrls: ['./db-list-tag.component.scss'],
})
export class DbListTagComponent implements OnInit {
  pjId: string = '';
  tag: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tagService: TagService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getAllTag();
  }

  getAllTag() {
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.pjId = id;
        this.tagService.getAllTag(this.pjId);
        this.tagService.tagOb.subscribe((data) => {
          this.tag = data;
        });
      }
    });
  }
  onDelete() {}
  toggleModal() {
    this.commonService.projectId.subscribe((id) => {
      if (id) {
        this.pjId = id;
      }
    });
    this.dialog.open(ModalAddTagComponent, {
      width: '30%',
      data: { pjId: this.pjId },
    });
  }
}
