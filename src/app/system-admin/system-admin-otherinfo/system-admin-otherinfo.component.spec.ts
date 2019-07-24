import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminOtherinfoComponent } from './system-admin-otherinfo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SystemAdminOtherinfoComponent', () => {
  let component: SystemAdminOtherinfoComponent;
  let fixture: ComponentFixture<SystemAdminOtherinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ SystemAdminOtherinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminOtherinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
