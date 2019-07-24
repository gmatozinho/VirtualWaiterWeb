import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdmComponent } from './login-adm/login-adm.component';
import { PageComponent } from './page/page.component';
import { SystemAdminPartnersComponent } from './system-admin-partners/system-admin-partners.component';
import { SystemAdminOtherinfoComponent } from './system-admin-otherinfo/system-admin-otherinfo.component';
import { SystemAdminPlansComponent } from './system-admin-plans/system-admin-plans.component';
import { SystemAdminSeeMoreOwnerComponent } from './system-admin-see-more-owner/system-admin-see-more-owner.component';
import { AuthGuardAdminPermission } from '../guards/auth.guard.adminpermission';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    component: LoginAdmComponent,
    path: 'login',
  },
  {
    canActivateChild: [AuthGuardAdminPermission],
    path: '',
    children: [
      {
        path: 'parceiros',
        children: [
          {
            component: SystemAdminPartnersComponent,
            path: '',
          },
          {
            component: SystemAdminSeeMoreOwnerComponent,
            path: 'visualizar/:id'
          }
        ]
      },
      {
        component: SystemAdminOtherinfoComponent,
        path: 'outros',
      },
      {
        component: SystemAdminPlansComponent,
        path: 'planos',
      },

    ],
    component: PageComponent,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SystemAdminRoutingModule { }
