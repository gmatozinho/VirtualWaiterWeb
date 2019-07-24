import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerInitComponent } from './partner-init/partner-init.component';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { PartnerKitchenComponent } from './partner-kitchen/partner-kitchen.component';
import { PartnerTablesComponent } from './partner-tables/partner-tables.component';
import { PartnerControlComponent } from './partner-control/partner-control.component';
import { PartnerEmployeesComponent } from './partner-employees/partner-employees.component';
import { PartnerReportsComponent } from './partner-reports/partner-reports.component';
import { PartnerEmployeeComponent } from './partner-employee/partner-employee.component';
import { PartnerListControlComponent } from './partner-list-control/partner-list-control.component';
import { PartnerNewRequestComponent } from './partner-new-request/partner-new-request.component';
import { PartnerEstablishmentComponent } from './partner-establishment/partner-establishment.component';
import { AuthGuard } from '../guards/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { PartnerMenuComponent } from './partner-menu/partner-menu.component';
import { PartnerProductComponent } from './partner-product/partner-product.component';
import { PartnerOwnerComponent } from './partner-owner/partner-owner.component';
import { SalesPerYearComponent } from './partner-reports/sales-per-year/sales-per-year.component';
import {
  SalerPerDayInCurrentMonthComponent
} from './partner-reports/saler-per-day-in-current-month/saler-per-day-in-current-month.component';
import { AuthGuardEstablishmentActive } from '../guards/auth.guard.establishmentactive';
import { AuthGuardUserPermission } from '../guards/auth.guard.userpermission';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full' },
  {
    component: NavigationComponent,
    canActivate: [AuthGuard],
    path: '',
    children: [
      {
        component: PartnerInitComponent,
        path: 'inicio',
      },
      {
        canActivateChild: [AuthGuardEstablishmentActive],
        path: '',
        children: [
          {
            component: PartnerDashboardComponent,
            path: 'dashboard',
          },
          {
            component: PartnerKitchenComponent,
            path: 'cozinha',
          },
          {
            component: PartnerTablesComponent,
            path: 'mesas',
          },
          {
            path: 'comandas',
            children: [
              {
                component: PartnerListControlComponent,
                path: '',
              },
              {
                component: PartnerControlComponent,
                path: 'visualizar/:id',
              }
            ]
          },
          {
            path: 'pedido',
            children: [
              {
                component: PartnerNewRequestComponent,
                path: 'novo/:id',
              }
            ]
          },
          {
            path: 'cardapio',
            children: [
              {
                component: PartnerMenuComponent,
                path: '',
              },
              {
                path: 'produto',
                children: [
                  {
                    component: PartnerProductComponent,
                    path: 'novo',
                    data: {title : 'Novo Produto'}
                  },
                  {
                    component: PartnerProductComponent,
                    path: 'editar/:id',
                    data: {title : 'Editar Produto'}
                  }
                ]
              }
            ]
          },
          {
            canActivateChild: [AuthGuardUserPermission],
            path: '',
            children: [
              {
                component: PartnerOwnerComponent,
                path: 'dono',
              },
              {
                component: PartnerEstablishmentComponent,
                path: 'estabelecimento',
              },
              {
                path: 'funcionarios',
                children: [
                  {
                    component: PartnerEmployeesComponent,
                    path: '',
                  },
                  {
                    component: PartnerEmployeeComponent,
                    path: 'novo',
                    data: {title : 'Novo Funcionário'}
                  },
                  {
                    component: PartnerEmployeeComponent,
                    path: 'editar/:id',
                    data: {title : 'Editar Funcionário'}
                  },
                ]
              },
              {
                component: PartnerReportsComponent,
                path: 'relatorios',
              },
              {
                component: SalesPerYearComponent,
                path: 'relatorios/vendas-por-ano',
              },
              {
                component: SalerPerDayInCurrentMonthComponent,
                path: 'relatorios/vendas-por-dia-mes-atual',
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
