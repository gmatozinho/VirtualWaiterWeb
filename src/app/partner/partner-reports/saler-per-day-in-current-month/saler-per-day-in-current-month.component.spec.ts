import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalerPerDayInCurrentMonthComponent } from './saler-per-day-in-current-month.component';

describe('SalerPerDayInCurrentMonthComponent', () => {
  let component: SalerPerDayInCurrentMonthComponent;
  let fixture: ComponentFixture<SalerPerDayInCurrentMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalerPerDayInCurrentMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalerPerDayInCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
