import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNamePartnerComponent } from './logo-name-partner.component';

describe('LogoNamePartnerComponent', () => {
  let component: LogoNamePartnerComponent;
  let fixture: ComponentFixture<LogoNamePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoNamePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoNamePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
