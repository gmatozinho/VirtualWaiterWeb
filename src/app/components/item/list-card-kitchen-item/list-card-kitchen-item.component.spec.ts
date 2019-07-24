import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardKitchenItemComponent } from './list-card-kitchen-item.component';
import { ComponentsModule } from '../../components.module';

describe('ListCardKitchenItemComponent', () => {
  let component: ListCardKitchenItemComponent;
  let fixture: ComponentFixture<ListCardKitchenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardKitchenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
