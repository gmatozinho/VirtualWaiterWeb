import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatDialog} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PartnerConfirmationDialogComponent } from '../partner-confirmation-dialog/partner-confirmation-dialog.component';
import { ControlService } from 'src/app/services/control.service';
import { Control, EnumSituacaoComanda } from 'src/app/models/Control';
import { ItemService } from 'src/app/services/item.service';
import {
  PartnerCloseControlDialogComponent
} from '../partner-tables/partner-close-control-dialog/partner-close-control-dialog.component';
import {
  PartnerInitAccountDialogComponent,
  InitAccountDialogData
} from '../partner-tables/partner-init-account-dialog/partner-init-account-dialog.component';
import {
  PartnerWaitingPaymentDialogComponent
} from '../partner-tables/partner-waiting-payment-dialog/partner-waiting-payment-dialog.component';
import { AccountService } from 'src/app/services/account.service';
import { TableService } from 'src/app/services/table.service';
import { EnumEstadoMesa } from 'src/app/models/Table';

export interface ItensDataSource {
  id: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
  entregue: boolean;
}

@Component({
  selector: 'app-partner-control',
  templateUrl: './partner-control.component.html',
  styleUrls: ['./partner-control.component.scss']
})
export class PartnerControlComponent implements OnInit {

  numeroComanda: number;
  cliente: string;
  mesa: number;
  mesaId: number;
  total = 0;
  displayedColumns: string[] = ['nome', 'quantidade', 'valorUnitario', 'total', 'entregue'];
  zero = 0;
  itens: ItensDataSource[] = [];

  dataSource = new MatTableDataSource<ItensDataSource>();
  fecharComandaDialogText = 'Tem certeza que deseja fechar esta comanda?';

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private controlApi: ControlService,
              private itemApi: ItemService,
              private accountApi: AccountService,
              private tableApi: TableService
              ) {
    this.getControl(this.route.snapshot.params.id);
  }

  getControl(id: number) {
    const controlTable: any = JSON.parse(sessionStorage.getItem('controlTable'));
    this.controlApi.getById(id).subscribe((data: Control) => {
      const control = data[this.zero];
      let produto: ItensDataSource;
      control.pedidos.forEach(pedido => {
        pedido.itens.forEach(item => {
          produto = {
            id: item.id,
            quantidade: item.quantidade,
            nome: item.produto.nome,
            valorUnitario: Number(item.preco),
            total: item.preco * item.quantidade,
            entregue: item.entregue
          };

          this.itens.push(produto);
        });
      });

      this.dataSource.data = this.itens;
      this.numeroComanda = control.id;
      this.cliente = control.responsavel.nome;
      this.mesa = controlTable.mesa;
      this.mesaId = controlTable.mesaId;
      this.calcTotal();
    });
  }

  delivered(itemId: number, itemEntregue: boolean) {
    const item = {
      id: itemId,
      entregue: itemEntregue
    };

    this.itemApi.update(item).subscribe(() => {
      alert('Item Atualizado');
    });
  }

  newOrder() {
    this.router.navigate(['/parceiro/pedido/novo/' + this.numeroComanda]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  calcTotal() {
    let totalTemp = 0;
    this.itens.forEach((element) => {
      totalTemp += element.total;

    });

    this.total = totalTemp;
  }

  fecharComanda() {
    this.controlApi.getById(this.numeroComanda).subscribe((data: Control[]) => {
      const comanda = data[this.zero];

      if (comanda.enumsituacaocomanda === EnumSituacaoComanda.Ativa) {
        const object = {
          comanda,
          mesa: this.mesaId
        };

        if (comanda.pedidos.length !== this.zero) {
          this.closeControl(object);
        } else {
          this.waitingFinishPaymentAccount(comanda.id, this.mesaId, false);
        }

      } else if (comanda.enumsituacaocomanda === EnumSituacaoComanda.AguardandoPagamento) {
        let total = 0;
        comanda.pedidos.forEach(pedido => {
          pedido.itens.forEach(item => {
            total += (item.preco * item.quantidade);
          });
        });

        this.initAccount(comanda.id, total, this.mesaId);
      } else {
        alert('Não possui operação para realizar nesta comanda');
      }
    });
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
            this.router.navigate(['/parceiro/comandas']);
          });
        });
      }
    });
  }

  ngOnInit(): void {
    /* this.calcTotal(); */
  }

  private buildDialogRef(texto: string) {
    return this.dialog.open(PartnerConfirmationDialogComponent, {
      width: '250px',
      data: {text: texto}
    });
  }


}
