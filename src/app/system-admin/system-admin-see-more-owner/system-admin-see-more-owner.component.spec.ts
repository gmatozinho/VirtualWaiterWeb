import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminSeeMoreOwnerComponent } from './system-admin-see-more-owner.component';

describe('SystemAdminSeeMoreOwnerComponent', () => {
  let component: SystemAdminSeeMoreOwnerComponent;
  let fixture: ComponentFixture<SystemAdminSeeMoreOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminSeeMoreOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminSeeMoreOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
