import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { LoginAdmComponent } from './login-adm/login-adm.component';
import { ComponentsModule } from '../components/components.module';
import { NavigationComponent } from './navigation/navigation.component';
import { PageComponent } from './page/page.component';
import { SystemAdminPartnersComponent } from './system-admin-partners/system-admin-partners.component';
import { SystemAdminOtherinfoComponent } from './system-admin-otherinfo/system-admin-otherinfo.component';
import { SystemAdminToolbarComponent } from './system-admin-toolbar/system-admin-toolbar.component';
import { SystemAdminPlansComponent } from './system-admin-plans/system-admin-plans.component';
import {
  SystemAdminPlanDialogComponent
} from './system-admin-plans/system-admin-plan-dialog/system-admin-dialog.component';
import {
  SystemAdminSeeMoreOwnerComponent
} from './system-admin-see-more-owner/system-admin-see-more-owner.component';
import {
  SystemAdminChoosePlanDialogComponent
} from './system-admin-choose-plan-dialog/system-admin-choose-plan-dialog.component';
import {
  SystemAdminConfirmationDialogComponent
} from './system-admin-confirmation-dialog/system-admin-confirmation-dialog.component';

@NgModule({
  declarations: [
    LoginAdmComponent,
    NavigationComponent,
    PageComponent,
    SystemAdminPartnersComponent,
    SystemAdminOtherinfoComponent,
    SystemAdminToolbarComponent,
    SystemAdminPlansComponent,
    SystemAdminPlanDialogComponent,
    SystemAdminSeeMoreOwnerComponent,
    SystemAdminChoosePlanDialogComponent,
    SystemAdminConfirmationDialogComponent
  ],
  entryComponents: [
    SystemAdminPlanDialogComponent,
    SystemAdminChoosePlanDialogComponent,
    SystemAdminConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SystemAdminRoutingModule,
    ComponentsModule
  ]
})
export class SystemAdminModule { }
