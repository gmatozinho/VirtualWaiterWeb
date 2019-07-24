import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminPlansComponent } from './system-admin-plans.component';

describe('SystemAdminPlansComponent', () => {
  let component: SystemAdminPlansComponent;
  let fixture: ComponentFixture<SystemAdminPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
