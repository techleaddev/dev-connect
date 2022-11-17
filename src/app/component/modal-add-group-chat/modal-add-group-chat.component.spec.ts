import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddGroupChatComponent } from './modal-add-group-chat.component';

describe('ModalAddGroupChatComponent', () => {
  let component: ModalAddGroupChatComponent;
  let fixture: ComponentFixture<ModalAddGroupChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddGroupChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddGroupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
