import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatDialog} from '@angular/material';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/models/Owner';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';
import {
  SystemAdminChoosePlanDialogComponent,
  ChoosePlanDialogData
} from '../system-admin-choose-plan-dialog/system-admin-choose-plan-dialog.component';
import { EstablishmentPlanService } from 'src/app/services/establishment-plan.service';
import { EstablishmentPlan } from 'src/app/models/EstablishmentPlan';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Establishment';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/Menu';
import {
  SystemAdminConfirmationDialogComponent
} from '../system-admin-confirmation-dialog/system-admin-confirmation-dialog.component';

export interface TabelaEstabelecimentos {
  nome: string;
  logo: string;
  status: string;
  novo: string;
  botao: string;
}

@Component({
  selector: 'app-system-admin-partners',
  templateUrl: './system-admin-partners.component.html',
  styleUrls: ['./system-admin-partners.component.scss']
})
export class SystemAdminPartnersComponent implements OnInit {
  displayedColumns: string[] = ['logo', 'nomeEstabelecimento', 'nomeDono', 'email', 'ativo', 'botao'];

  dataSource: MatTableDataSource<Owner> = new MatTableDataSource();
  zero = 0;

  constructor(
    private ownerApi: OwnerService,
    public dialog: MatDialog,
    private router: Router,
    private planApi: PlanService,
    private establishmentPlanApi: EstablishmentPlanService,
    private establishmentApi: EstablishmentService,
    private menuApi: MenuService
  ) {
    this.ownerApi.getAll().subscribe((data: Owner[]) => {
      this.dataSource.data = data;
    });
  }

  seeMore(id: number) {
    this.router.navigate(['/olimpo/parceiros/visualizar/' + id]);
  }

  activateOrDisable(establishmentId: number, status: boolean) {

    if (status) {
      this.activate(establishmentId, status);
    } else {
      this.disable(establishmentId, status);
    }

  }

  activate(establishmentId: number, status: boolean) {
    this.planApi.getAll().subscribe((data) => {
      const dialogRef = this.dialog.open(SystemAdminChoosePlanDialogComponent, {
        width: '320px',
        data: {plans: data}
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const newEstablishmentPlan: EstablishmentPlan = {
            datainicio: new Date(),
            datafim: new Date(),
            estabelecimentoid: establishmentId,
            planoid: result
          };

          this.establishmentPlanApi.create(newEstablishmentPlan).subscribe(() => {
            const updateEstablishment: Establishment = {
              id: establishmentId,
              ativo: status
            };

            this.establishmentApi.update(updateEstablishment).subscribe(() => {
              this.menuApi.getByEstablishmentId(establishmentId).subscribe((menus: Menu[]) => {
                const updateMenu = {
                  id: menus[this.zero].id,
                  ativo: status
                };

                this.menuApi.update(updateMenu).subscribe(() => {
                  alert('Plano inserido e estabelecimento ativado');
                });
              });
            });
          });
        }
      });
    });
  }



  disable(establishmentId: number, status: boolean) {
    const text = 'Tem certeza que querem desativar esse estabelecimento?';
    const dialogRef = this.dialog.open(SystemAdminConfirmationDialogComponent, {
      width: '320px',
      data: {text}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateEstablishment: Establishment = {
          id: establishmentId,
          ativo: status
        };

        this.establishmentApi.update(updateEstablishment).subscribe(() => {
          this.menuApi.getByEstablishmentId(establishmentId).subscribe((menus: Menu[]) => {
            const updateMenu = {
              id: menus[this.zero].id,
              ativo: status
            };

            this.menuApi.update(updateMenu).subscribe(() => {
              alert('Plano removido e estabelecimento desativado');
            });
          });
        });
      }
    });


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
  }


}
