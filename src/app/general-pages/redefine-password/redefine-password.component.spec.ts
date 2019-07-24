import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinePasswordComponent } from './redefine-password.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RedefinePasswordComponent', () => {
  let component: RedefinePasswordComponent;
  let fixture: ComponentFixture<RedefinePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), CommonModule, ComponentsModule, BrowserAnimationsModule],
      declarations: [ RedefinePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefinePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
