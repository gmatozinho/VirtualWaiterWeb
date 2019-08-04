import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Control, EnumSituacaoComanda } from 'src/app/models/Control';
import { EnumEstadoMesa } from 'src/app/models/Table';
import { ControlService } from 'src/app/services/control.service';
import { MatDialog } from '@angular/material';
import {
  PartnerAddControlSimpleDialogComponent, SimpleControlDialogData
} from './partner-add-control-simple-dialog/partner-add-control-simple-dialog.component';
import { Consumer } from 'src/app/models/Consumer';
import { TableService } from 'src/app/services/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent implements OnInit {

  @Input() id: number;
  @Input() numero: number;
  @Input() comandas: Control[];
  @Input() enumestadomesa: EnumEstadoMesa;
  @Output() remove: EventEmitter<object> = new EventEmitter();
  @Output() closeTable: EventEmitter<object> = new EventEmitter();

  textoBotao: string;
  mesaOcupada: boolean;
  comanda: Control;
  zero = 0;

  constructor(private controlApi: ControlService,
              public dialog: MatDialog,
              private tableApi: TableService,
              private router: Router) { }

  setMesaOcupada(enumestadomesa: EnumEstadoMesa): void {
    if (enumestadomesa === EnumEstadoMesa.Vaga) {
      this.mesaOcupada = false;
    } else if (enumestadomesa === EnumEstadoMesa.Ocupada) {
      this.mesaOcupada = true;
      this.comanda = this.comandas[this.zero];
    }
  }

  setTextoBotao(enumestadomesa: EnumEstadoMesa): void {
    if (enumestadomesa === EnumEstadoMesa.Vaga) {
      this.textoBotao = 'Abrir Comanda';
    } else if (enumestadomesa === EnumEstadoMesa.Ocupada) {
      this.textoBotao = 'Exibir Conta';
    }
  }

  removeTable(id: number): void {
    this.remove.emit({id});
  }

  closeControl(): void {
    this.closeTable.emit({comanda: this.comanda, mesa: this.id});
  }

  openControl() {
    const dialogRef = this.dialog.open(PartnerAddControlSimpleDialogComponent, {
      width: '320px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: SimpleControlDialogData) => {
      if (result) {
        const consumer: Consumer = {
          nome: result.nome,
          celular: result.celular
        };

        const control: Control = {
          enumsituacaocomanda: EnumSituacaoComanda.Ativa,
          horarioinicio: new Date(),
          mesa: this.id,
          responsavel: consumer,
          consumidores: [consumer]
        };

        this.controlApi.create(control).subscribe((data: Control) => {
          const table = {
            id: this.id,
            enumestadomesa: EnumEstadoMesa.Ocupada
          };

          this.tableApi.update(table).subscribe(() => {
            location.reload();
          });
        });

      }
    });
  }

  showControl() {
    const controlTable = {
      mesa: this.numero
    };
    sessionStorage.setItem('controlTable', JSON.stringify(controlTable));
    this.router.navigate(['/parceiro/comandas/visualizar/' + this.comanda.id]);
  }

  ngOnInit() {
    this.setMesaOcupada(this.enumestadomesa);
    this.setTextoBotao(this.enumestadomesa);
  }

}
