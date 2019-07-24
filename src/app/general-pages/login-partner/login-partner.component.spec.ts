import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPartnerComponent } from './login-partner.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

describe('LoginPartnerComponent', () => {
  let component: LoginPartnerComponent;
  let fixture: ComponentFixture<LoginPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterModule.forRoot([]), BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [ LoginPartnerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
