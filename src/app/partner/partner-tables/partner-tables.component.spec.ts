import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTablesComponent } from './partner-tables.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerTablesComponent', () => {
  let component: PartnerTablesComponent;
  let fixture: ComponentFixture<PartnerTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), ComponentsModule, BrowserAnimationsModule],
      declarations: [ PartnerTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
