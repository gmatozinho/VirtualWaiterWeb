import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOwnerComponent } from './partner-owner.component';

describe('PartnerOwnerComponent', () => {
  let component: PartnerOwnerComponent;
  let fixture: ComponentFixture<PartnerOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
