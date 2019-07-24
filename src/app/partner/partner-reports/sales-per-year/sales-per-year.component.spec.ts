import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerYearComponent } from './sales-per-year.component';

describe('SalesPerYearComponent', () => {
  let component: SalesPerYearComponent;
  let fixture: ComponentFixture<SalesPerYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPerYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
