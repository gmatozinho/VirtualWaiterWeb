import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralPagesRoutingModule } from './general-pages-routing.module';

import { RedefinePasswordComponent } from './redefine-password/redefine-password.component';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { GeneralPagesToolbarComponent } from './general-pages-toolbar/general-pages-toolbar.component';
import { PageComponent } from './page/page.component';
import { LoginPartnerComponent } from './login-partner/login-partner.component';
import { RegisterPartnerComponent } from './register-partner/register-partner.component';
import { BeAPartnerComponent } from './be-a-partner/be-a-partner.component';

@NgModule({
  declarations: [
    LoginPartnerComponent,
    RedefinePasswordComponent,
    RedefinePasswordComponent,
    HomeComponent,
    GeneralPagesToolbarComponent,
    PageComponent,
    RegisterPartnerComponent,
    BeAPartnerComponent
  ],
  imports: [
    CommonModule,
    GeneralPagesRoutingModule,
    ComponentsModule
  ]
})
export class GeneralPagesModule {

 }
