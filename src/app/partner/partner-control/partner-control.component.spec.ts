import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerControlComponent } from './partner-control.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PartnerModule } from '../partner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerControlComponent', () => {
  let component: PartnerControlComponent;
  let fixture: ComponentFixture<PartnerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ PartnerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
