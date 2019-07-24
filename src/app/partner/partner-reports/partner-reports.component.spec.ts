import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReportsComponent } from './partner-reports.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerReportsComponent', () => {
  let component: PartnerReportsComponent;
  let fixture: ComponentFixture<PartnerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ PartnerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
