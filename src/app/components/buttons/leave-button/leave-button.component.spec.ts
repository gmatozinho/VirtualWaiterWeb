import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveButtonComponent } from './leave-button.component';
import { MatIconModule } from '@angular/material';

describe('LeaveButtonComponent', () => {
  let component: LeaveButtonComponent;
  let fixture: ComponentFixture<LeaveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ LeaveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
