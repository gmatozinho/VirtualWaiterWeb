import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEmployeesComponent } from './partner-employees.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerEmployeesComponent', () => {
  let component: PartnerEmployeesComponent;
  let fixture: ComponentFixture<PartnerEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ PartnerEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
