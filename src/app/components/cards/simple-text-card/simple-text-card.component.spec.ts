import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextCardComponent } from './simple-text-card.component';
import { ComponentsModule } from '../../components.module';

describe('SimpleTextCardComponent', () => {
  let component: SimpleTextCardComponent;
  let fixture: ComponentFixture<SimpleTextCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
