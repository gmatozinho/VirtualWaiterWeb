import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatDialog} from '@angular/material';
import { ControlService } from 'src/app/services/control.service';
import { CurrentUser } from 'src/app/services/authentication.service';
import { TableService } from 'src/app/services/table.service';
import { Table, EnumEstadoMesa } from 'src/app/models/Table';
import { Control, EnumSituacaoComanda } from 'src/app/models/Control';
import {
  PartnerAddControlDialogComponent, ControlDialogData
} from './partner-add-control-dialog/partner-add-control-dialog.component';
import { Consumer } from 'src/app/models/Consumer';
import { Router } from '@angular/router';

export interface ControlDataSource {
  id: number;
  responsavel: string;
  mesa: number;
  mesaId: number;
  consumototal: number;
}

@Component({
  selector: 'app-partner-list-control',
  templateUrl: './partner-list-control.component.html',
  styleUrls: ['./partner-list-control.component.scss']
})
export class PartnerListControlComponent implements OnInit {

  displayedColumns: string[] = ['responsavel', 'mesa', 'consumototal', 'visualizar'];

  controls: ControlDataSource[] = [];
  tables: Table[] = [];
  dataSource = new MatTableDataSource(this.controls);
  zero = 0;

  constructor(private controlApi: ControlService,
              private tableApi: TableService,
              public dialog: MatDialog,
              private router: Router) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openControl() {
    if (this.tables.length > this.zero) {
      const dialogRef = this.dialog.open(PartnerAddControlDialogComponent, {
        width: '320px',
        data: {mesas: this.tables}
      });

      dialogRef.afterClosed().subscribe((result: ControlDialogData) => {
        if (result) {

          const consumer: Consumer = {
            nome: result.nome,
            celular: result. celular
          };

          const control: Control = {
            enumsituacaocomanda: EnumSituacaoComanda.Ativa,
            horarioinicio: new Date(),
            mesa: result.mesaId,
            responsavel: consumer,
            consumidores: [consumer]
          };

          this.controlApi.create(control).subscribe((data: Control) => {
            const controlDataSource = {
              id: data.id,
              mesa: result.mesa,
              mesaId: result.mesaId,
              responsavel: data.responsavel.nome,
              consumototal: 0
            };

            this.controls.push(controlDataSource);
            this.dataSource.data = this.controls;

            const table = {
              id: result.mesaId,
              enumestadomesa: EnumEstadoMesa.Ocupada
            };

            this.tableApi.update(table).subscribe(() => {
            });
          });

        }
      });
    } else {
      alert('Sem mesas disponíveis');
    }

  }

  seeControl(id: number, mesa: number, mesaId: number) {
    const controlTable = {
      mesa, mesaId
    };
    sessionStorage.setItem('controlTable', JSON.stringify(controlTable));
    this.router.navigate(['/parceiro/comandas/visualizar/' + id]);
  }

  ngOnInit(): void {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.tableApi.getByEstablishmentId(currentUser.estabelecimentoId).subscribe((data: Table[]) => {
      data.sort((a, b) => a.numero - b.numero);
      data.forEach(table => {
        if (table.enumestadomesa !== EnumEstadoMesa.Vaga) {
          table.comandas.forEach(control => {
            if (control.enumsituacaocomanda !== EnumSituacaoComanda.Encerrada) {
              let total = 0;
              control.pedidos.forEach(pedido => {
                pedido.itens.forEach(item => {
                  total += Number(item.preco * item.quantidade);
                });
              });
              const controlDataSource = {
                id: control.id,
                mesa: table.numero,
                mesaId: table.id,
                responsavel: control.responsavel.nome,
                consumototal: total
              };

              this.controls.push(controlDataSource);
            }
          });
        } else {
          this.tables.push(table);
        }
      });

      this.dataSource.data = this.controls;
    });
  }
}
