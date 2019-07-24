import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantBeAPartnerButtonComponent } from './want-be-a-partner-button.component';

describe('WantBeAPartnerButtonComponent', () => {
  let component: WantBeAPartnerButtonComponent;
  let fixture: ComponentFixture<WantBeAPartnerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantBeAPartnerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantBeAPartnerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
