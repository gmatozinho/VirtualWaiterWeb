import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeAPartnerComponent } from './be-a-partner.component';

describe('BeAPartnerComponent', () => {
  let component: BeAPartnerComponent;
  let fixture: ComponentFixture<BeAPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeAPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeAPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
