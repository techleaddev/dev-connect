import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTagComponent } from './modal-add-tag.component';

describe('ModalAddTagComponent', () => {
  let component: ModalAddTagComponent;
  let fixture: ComponentFixture<ModalAddTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
