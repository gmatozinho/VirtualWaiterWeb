import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeAPartnerButtonComponent } from './be-a-partner-button.component';

describe('BeAPartnerButtonComponent', () => {
  let component: BeAPartnerButtonComponent;
  let fixture: ComponentFixture<BeAPartnerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeAPartnerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeAPartnerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
