import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  PartnerConfirmationDialogComponent } from '../partner-confirmation-dialog/partner-confirmation-dialog.component';
import { Table, EnumEstadoMesa } from 'src/app/models/Table';
import { TableService } from 'src/app/services/table.service';
import { CurrentUser } from 'src/app/services/authentication.service';

import {
  PartnerCloseControlDialogComponent
} from './partner-close-control-dialog/partner-close-control-dialog.component';
import { EnumSituacaoComanda, Control } from 'src/app/models/Control';
import { PartnerAddTableDialogComponent } from './partner-add-table-dialog/partner-add-table-dialog.component';
import { ControlService } from 'src/app/services/control.service';
import { AccountService } from 'src/app/services/account.service';
import {
  PartnerInitAccountDialogComponent,
  InitAccountDialogData
} from './partner-init-account-dialog/partner-init-account-dialog.component';
import {
  PartnerWaitingPaymentDialogComponent
} from './partner-waiting-payment-dialog/partner-waiting-payment-dialog.component';

@Component({
  selector: 'app-partner-tables',
  templateUrl: './partner-tables.component.html',
  styleUrls: ['./partner-tables.component.scss']
})
export class PartnerTablesComponent implements OnInit {
  options: string[] = ['01', '02', '03', '04'];
  number = 6;
  addTableDialogText = 'Deseja Adicionar uma nova mesa?';
  removeTableDialogText = 'Tem certeza que deseja remover esta mesa? ';
  currentUser: CurrentUser;
  tables: Table[] = [];
  code: string;
  tableStatus: EnumEstadoMesa;
  establishment: any;
  zero = 0;
  private invalidindex = -1;

  constructor(
    public dialog: MatDialog,
    public tableApi: TableService,
    private controlApi: ControlService,
    private accountApi: AccountService
    ) {

  }

  addTable() {
    const dialogRef = this.dialog.open(PartnerAddTableDialogComponent, {
      width: '320px',
      data: {text: this.addTableDialogText}
    });

    dialogRef.afterClosed().subscribe((result: Table) => {
      if (result) {

        const table: Table = {
          numero: result.numero,
          codigo: result.codigo,
          enumestadomesa: EnumEstadoMesa.Vaga,
          estabelecimento: this.currentUser.estabelecimentoId,
          ativo: true
        };

        this.tableApi.create(table).subscribe((data) => {
          this.tables.push(data);
        });

      }
    });
  }

  fecharComanda(object: { comanda: any; mesa: any; }) {
      const comanda = object.comanda;
      const mesaId = object.mesa;

      if (comanda.enumsituacaocomanda === EnumSituacaoComanda.Ativa) {
        if (comanda.pedidos.length !== this.zero) {
          this.closeControl(object);
        } else {
          this.waitingFinishPaymentAccount(comanda.id, mesaId, false);
        }

      } else if (comanda.enumsituacaocomanda === EnumSituacaoComanda.AguardandoPagamento) {
        let total = 0;
        comanda.pedidos.forEach(pedido => {
          pedido.itens.forEach(item => {
            total += (item.preco * item.quantidade);
          });
        });

        this.initAccount(comanda.id, total, mesaId);
      } else {
        alert('Não possui operação para realizar nesta comanda');
      }
  }

  closeControl(object: { comanda: any; mesa: any; }) {
    const control = object.comanda;
    const mesa = object.mesa;
    const itens = [];
    let total = 0;
    control.pedidos.forEach(pedido => {
      pedido.itens.forEach(item => {
        itens.push(item);
        total += (item.preco * item.quantidade);
      });
    });

    const dialogRef = this.dialog.open(PartnerCloseControlDialogComponent, {
      width: '500px',
      data: {
        clienteName: control.responsavel.nome,
        itens,
        total
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateControl = {
          id: control.id,
          enumsituacaocomanda: EnumSituacaoComanda.AguardandoPagamento
        };

        this.controlApi.update(updateControl).subscribe(() => {
          this.initAccount(control.id, total, mesa);
        });
      }
    });
  }

  initAccount(controlId: number, total: number, mesa: number) {
    this.accountApi.getByControlId(controlId).subscribe((data: Control[]) => {

      if (data.length === this.zero) {
        const dialogRef = this.dialog.open(PartnerInitAccountDialogComponent, {
          width: '300px',
          data: {
            total
          }
        });

        dialogRef.afterClosed().subscribe((result: InitAccountDialogData) => {
          if (result) {
            const newAccount = {
              total: result.total,
              enumformapagamento: result.formapagamento,
              taxaservico: 0,
              comanda: controlId
            };

            this.accountApi.update(newAccount).subscribe(() => {
              this.waitingFinishPaymentAccount(controlId, mesa, true);
            });
          }
        });
      } else {
        this.waitingFinishPaymentAccount(controlId, mesa, true);
      }
    });
  }

  waitingFinishPaymentAccount(controlId: number, mesa: number, hasItens: boolean) {
    let text = '';
    let alertText = '';

    if (hasItens) {
      text = 'Aguardando Conclusão do Pagamento';
      alertText = 'Pagamento concluido e mesa liberada';

    } else {
      text = 'Aguardando Encerramento da Comanda e Liberação da mesa';
      alertText = 'Comanda encerrada e mesa liberada';
    }


    const dialogRef = this.dialog.open(PartnerWaitingPaymentDialogComponent, {
      width: '400px',
      data: {text}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateControl = {
          id: controlId,
          enumsituacaocomanda: EnumSituacaoComanda.Encerrada,
          horariofim: new Date()
        };

        this.controlApi.update(updateControl).subscribe(() => {
          const updateTable = {
            id: mesa,
            enumestadomesa: EnumEstadoMesa.Vaga,
          };
          this.tableApi.update(updateTable).subscribe(() => {
            alert(alertText);
            location.reload();
          });
        });
      }
    });
  }

  // função para receber emit Output do Filho
  removeTable(tableToRemove: Table): void {
    const texto = this.removeTableDialogText;
    const dialogRef = this.dialog.open(PartnerConfirmationDialogComponent, {
      width: '250px',
      data: {text: texto}
    });

    const index: number = this.tables.findIndex(mesa => mesa.id === tableToRemove.id);
    const table = this.tables[index];

    if (table.enumestadomesa !== EnumEstadoMesa.Ocupada) {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (index !== this.invalidindex) {
            this.tableApi.remove(this.tables[index]).subscribe(() => {
              alert('Mesa Removida');
              /* location.reload(); */
              this.tables.splice(index, 1);
            });
          }
        }
      });
    }
  }


  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.tableApi.getByEstablishmentId(this.currentUser.estabelecimentoId).subscribe((data: Table[]) => {
      data.sort((a, b) => a.numero - b.numero);
      const mesas = [];

      if (data) {
        data.forEach(mesa => {
          if (mesa.comandas.length > this.zero) {
            const control = mesa.comandas.find((comanda) => {
              return comanda.enumsituacaocomanda !== EnumSituacaoComanda.Encerrada;
            });

            mesa.comandas = [control];
          }
          mesas.push(mesa);
        });
      }

      this.tables = mesas;
    });
  }
}


