import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFormCardComponent } from './owner-form-card.component';

describe('OwnerFormCardComponent', () => {
  let component: OwnerFormCardComponent;
  let fixture: ComponentFixture<OwnerFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
