import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerKitchenComponent } from './partner-kitchen.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerKitchenComponent', () => {
  let component: PartnerKitchenComponent;
  let fixture: ComponentFixture<PartnerKitchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ PartnerKitchenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
