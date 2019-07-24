import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdmComponent } from './login-adm.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginAdmComponent', () => {
  let component: LoginAdmComponent;
  let fixture: ComponentFixture<LoginAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ LoginAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
