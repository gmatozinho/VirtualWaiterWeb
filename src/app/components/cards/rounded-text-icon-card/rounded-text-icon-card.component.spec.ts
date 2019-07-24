import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedTextIconCardComponent } from './rounded-text-icon-card.component';

describe('RoundedTextIconCardComponent', () => {
  let component: RoundedTextIconCardComponent;
  let fixture: ComponentFixture<RoundedTextIconCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundedTextIconCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundedTextIconCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
