import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonMenuComponent } from './icon-button-menu.component';

describe('IconButtonMenuComponent', () => {
  let component: IconButtonMenuComponent;
  let fixture: ComponentFixture<IconButtonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconButtonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
