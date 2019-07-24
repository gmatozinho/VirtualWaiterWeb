import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPagesToolbarComponent } from './general-pages-toolbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

describe('GeneralPagesToolbarComponent', () => {
  let component: GeneralPagesToolbarComponent;
  let fixture: ComponentFixture<GeneralPagesToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), CommonModule, ComponentsModule],
      declarations: [ GeneralPagesToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPagesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
