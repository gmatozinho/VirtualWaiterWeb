import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    loadChildren: './general-pages/general-pages.module#GeneralPagesModule',
    path: '',
  },
  {
    loadChildren: './partner/partner.module#PartnerModule',
    path: 'parceiro',
  },
  {
    loadChildren: './system-admin/system-admin.module#SystemAdminModule',
    path: 'olimpo',
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes/* ,{ enableTracing: true } */)],
})
export class AppRoutingModule { }
