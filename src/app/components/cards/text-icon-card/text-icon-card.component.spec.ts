import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextIconCardComponent } from './text-icon-card.component';
import { ComponentsModule } from '../../components.module';

describe('TextIconCardComponent', () => {
  let component: TextIconCardComponent;
  let fixture: ComponentFixture<TextIconCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextIconCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
