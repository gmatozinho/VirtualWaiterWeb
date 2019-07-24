import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentFormCardComponent } from './establishment-form-card.component';

describe('EstablishmentFormCardComponent', () => {
  let component: EstablishmentFormCardComponent;
  let fixture: ComponentFixture<EstablishmentFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
