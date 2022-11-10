import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbListMemberComponent } from './db-list-member.component';

describe('DbListMemberComponent', () => {
  let component: DbListMemberComponent;
  let fixture: ComponentFixture<DbListMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbListMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
