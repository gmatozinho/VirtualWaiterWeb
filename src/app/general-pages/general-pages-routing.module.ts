import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedefinePasswordComponent } from './redefine-password/redefine-password.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { LoginPartnerComponent } from './login-partner/login-partner.component';
import { BeAPartnerComponent } from './be-a-partner/be-a-partner.component';
import { RegisterPartnerComponent } from './register-partner/register-partner.component';

const routes: Routes = [
  {
    component: PageComponent,
    path: '',
    children: [
      {
        component: LoginPartnerComponent,
        path: 'entrar',
      },
      {
        component: RedefinePasswordComponent,
        path: 'redefinir-senha',
      },
      {
        component: HomeComponent,
        path: 'home',
      },
      {
        path: 'ser-parceiro',
        children: [
          {
            component: BeAPartnerComponent,
            path: ''
          },
          {
            component: RegisterPartnerComponent,
            path: 'cadastrar'
          }
        ]
      }
    ]
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class GeneralPagesRoutingModule { }
