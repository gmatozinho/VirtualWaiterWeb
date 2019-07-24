import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTotalButtonComponent } from './general-total-button.component';

describe('GeneralTotalButtonComponent', () => {
  let component: GeneralTotalButtonComponent;
  let fixture: ComponentFixture<GeneralTotalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTotalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTotalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
