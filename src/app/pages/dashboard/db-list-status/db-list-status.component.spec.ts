import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbListStatusComponent } from './db-list-status.component';

describe('DbListStatusComponent', () => {
  let component: DbListStatusComponent;
  let fixture: ComponentFixture<DbListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbListStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
