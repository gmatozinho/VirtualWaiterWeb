import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { ComponentsModule } from '../components/components.module';
import { PartnerInitComponent } from './partner-init/partner-init.component';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PartnerTablesComponent} from './partner-tables/partner-tables.component';
import { PartnerKitchenComponent } from './partner-kitchen/partner-kitchen.component';
import { PartnerControlComponent } from './partner-control/partner-control.component';
import { PartnerEmployeesComponent } from './partner-employees/partner-employees.component';
import { PartnerReportsComponent } from './partner-reports/partner-reports.component';
import { PartnerEmployeeComponent } from './partner-employee/partner-employee.component';
import { PartnerListControlComponent } from './partner-list-control/partner-list-control.component';
import { PartnerNewRequestComponent } from './partner-new-request/partner-new-request.component';
import { AddItemDialogComponent } from './partner-new-request/add-item-dialog/add-item-dialog.component';
import {
  PartnerConfirmationDialogComponent
} from './partner-confirmation-dialog/partner-confirmation-dialog.component';
import { PartnerEstablishmentComponent } from './partner-establishment/partner-establishment.component';

import { SeeObservationDialogComponent } from './partner-kitchen/see-observation-dialog.component';
import { PartnerMenuComponent } from './partner-menu/partner-menu.component';
import { PartnerProductComponent } from './partner-product/partner-product.component';
import {
  PartnerAddSessionDialogComponent
} from './partner-menu/partner-add-session-dialog/partner-add-session-dialog.component';
import {
  PartnerAddTableDialogComponent
} from './partner-tables/partner-add-table-dialog/partner-add-table-dialog.component';
import {
  PartnerAddControlDialogComponent
} from './partner-list-control/partner-add-control-dialog/partner-add-control-dialog.component';
import {
  PartnerCloseControlDialogComponent
} from './partner-tables/partner-close-control-dialog/partner-close-control-dialog.component';
import {
  PartnerInitAccountDialogComponent
} from './partner-tables/partner-init-account-dialog/partner-init-account-dialog.component';
import {
  PartnerWaitingPaymentDialogComponent
} from './partner-tables/partner-waiting-payment-dialog/partner-waiting-payment-dialog.component';
import { PartnerOwnerComponent } from './partner-owner/partner-owner.component';
import { SalesPerYearComponent } from './partner-reports/sales-per-year/sales-per-year.component';
import {
  SalerPerDayInCurrentMonthComponent
} from './partner-reports/saler-per-day-in-current-month/saler-per-day-in-current-month.component';

@NgModule({
  declarations: [
    PartnerInitComponent,
    PartnerDashboardComponent,
    NavigationComponent,
    PartnerTablesComponent,
    PartnerKitchenComponent,
    PartnerControlComponent,
    PartnerEmployeesComponent,
    PartnerReportsComponent,
    PartnerEmployeeComponent,
    PartnerListControlComponent,
    PartnerNewRequestComponent,
    PartnerConfirmationDialogComponent,
    PartnerAddSessionDialogComponent,
    AddItemDialogComponent,
    PartnerEstablishmentComponent,
    SeeObservationDialogComponent,
    PartnerAddTableDialogComponent,
    PartnerCloseControlDialogComponent,
    PartnerMenuComponent,
    PartnerProductComponent,
    PartnerAddControlDialogComponent,
    PartnerInitAccountDialogComponent,
    PartnerWaitingPaymentDialogComponent,
    PartnerOwnerComponent,
    SalesPerYearComponent,
    SalerPerDayInCurrentMonthComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    ComponentsModule
  ],
  entryComponents: [
    PartnerConfirmationDialogComponent,
    AddItemDialogComponent,
    SeeObservationDialogComponent,
    PartnerAddSessionDialogComponent,
    PartnerAddTableDialogComponent,
    PartnerAddControlDialogComponent,
    PartnerCloseControlDialogComponent,
    PartnerInitAccountDialogComponent,
    PartnerWaitingPaymentDialogComponent
  ]
})
export class PartnerModule { }
