import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFormButtonComponent } from './confirm-form-button.component';

describe('ConfirmFormButtonComponent', () => {
  let component: ConfirmFormButtonComponent;
  let fixture: ComponentFixture<ConfirmFormButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmFormButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
