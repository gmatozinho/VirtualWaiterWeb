import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTabsModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatTableModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatProgressSpinnerModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginButtonComponent } from './buttons/login-button/login-button.component';
import { WantBeAPartnerButtonComponent } from './buttons/want-be-a-partner-button/want-be-a-partner-button.component';
import { SimpleTextCardComponent } from './cards/simple-text-card/simple-text-card.component';
import { RoundedTextIconCardComponent } from './cards/rounded-text-icon-card/rounded-text-icon-card.component';
import { TextIconCardComponent } from './cards/text-icon-card/text-icon-card.component';
import { LoginCardComponent } from './cards/login-card/login-card.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { PasswordInputComponent } from './inputs/password-input/password-input.component';
import { ForgotPasswordButtonComponent } from './buttons/forgot-password-button/forgot-password-button.component';
import { ConfirmFormButtonComponent } from './buttons/confirm-form-button/confirm-form-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NextButtonComponent } from './buttons/next-button/next-button.component';
import { CancelButtonComponent } from './buttons/cancel-button/cancel-button.component';
import { IconButtonMenuComponent } from './buttons/icon-button-menu/icon-button-menu.component';
import { LogoNamePartnerComponent } from './logo-name-partner/logo-name-partner.component';
import { LeaveButtonComponent } from './buttons/leave-button/leave-button.component';
import { ListCardKitchenItemComponent } from './item/list-card-kitchen-item/list-card-kitchen-item.component';
import { SearchInputComponent } from './inputs/search-input/search-input.component';
import { TableCardComponent } from './cards/table-card/table-card.component';
import { GeneralTotalButtonComponent } from './buttons/general-total-button/general-total-button.component';
import { UpdateButtonComponent } from './buttons/update-button/update-button.component';
import { BeAPartnerButtonComponent } from './buttons/be-a-partner-button/be-a-partner-button.component';
import { OwnerFormCardComponent } from './cards/owner-form-card/owner-form-card.component';
import {NgxMaskModule} from 'ngx-mask';
import { EstablishmentFormCardComponent } from './cards/establishment-form-card/establishment-form-card.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {ChartModule} from 'primeng/chart';
import {
  PartnerAddControlSimpleDialogComponent
} from './cards/table-card/partner-add-control-simple-dialog/partner-add-control-simple-dialog.component';

@NgModule({
  declarations: [
    LoginButtonComponent,
    WantBeAPartnerButtonComponent,
    SimpleTextCardComponent,
    TextIconCardComponent,
    RoundedTextIconCardComponent,
    LoginCardComponent,
    TextInputComponent,
    PasswordInputComponent,
    ForgotPasswordButtonComponent,
    ConfirmFormButtonComponent,
    CheckboxComponent,
    NextButtonComponent,
    CancelButtonComponent,
    IconButtonMenuComponent,
    LogoNamePartnerComponent,
    LeaveButtonComponent,
    ListCardKitchenItemComponent,
    SearchInputComponent,
    TableCardComponent,
    GeneralTotalButtonComponent,
    LeaveButtonComponent,
    LogoNamePartnerComponent,
    UpdateButtonComponent,
    BeAPartnerButtonComponent,
    OwnerFormCardComponent,
    EstablishmentFormCardComponent,
    PartnerAddControlSimpleDialogComponent
  ],
  entryComponents: [PartnerAddControlSimpleDialogComponent],
  exports: [
    LoginButtonComponent,
    WantBeAPartnerButtonComponent,
    BeAPartnerButtonComponent,
    SimpleTextCardComponent,
    TextIconCardComponent,
    RoundedTextIconCardComponent,
    LoginCardComponent,
    TextInputComponent,
    PasswordInputComponent,
    ForgotPasswordButtonComponent,
    ConfirmFormButtonComponent,
    CheckboxComponent,
    NextButtonComponent,
    CancelButtonComponent,
    ListCardKitchenItemComponent,
    OwnerFormCardComponent,
    IconButtonMenuComponent,
    SearchInputComponent,
    LogoNamePartnerComponent,
    TableCardComponent,
    GeneralTotalButtonComponent,
    LeaveButtonComponent,
    EstablishmentFormCardComponent,
    LogoNamePartnerComponent,
    UpdateButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    NgxMaskModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    UcWidgetModule,
    ChartModule
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    NgxMaskModule.forRoot(),
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    UcWidgetModule,
    ChartModule
  ]
})
export class ComponentsModule { }
