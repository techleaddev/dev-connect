import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbListTagComponent } from './db-list-tag.component';

describe('DbListTagComponent', () => {
  let component: DbListTagComponent;
  let fixture: ComponentFixture<DbListTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbListTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbListTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
