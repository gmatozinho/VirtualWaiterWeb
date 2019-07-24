import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SeeObservationDialogComponent } from './see-observation-dialog.component';
import { MatDialog } from '@angular/material';
import { CurrentUser } from 'src/app/services/authentication.service';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/Table';
import { EnumSituacaoComanda } from 'src/app/models/Control';

export interface Pedido {
  id: number;
  nomeProduto: string;
  mesa: number;
  observation: string;
}

export interface Quadro {
  titulo: string;
  id: string;
  pedidos: Pedido[];
}

export interface DialogData {
  name: string;
  observation: string;
}


@Component({
  selector: 'app-partner-kitchen',
  templateUrl: './partner-kitchen.component.html',
  styleUrls: ['./partner-kitchen.component.scss']
})
export class PartnerKitchenComponent implements OnInit {

  waitingTitle = 'Em Espera';
  preparingTitle = 'Em Preparo';
  finishTitle = 'Finalizado';

  waiting: Quadro = {
    id: '1',
    titulo: this.waitingTitle,
    pedidos: []
  };

  preparing: Quadro = {
    id: '2',
    titulo: this.preparingTitle,
    pedidos: []
  };

  finish: Quadro = {
    id: '3',
    titulo: this.finishTitle,
    pedidos: []
  };

  quadros: Quadro[]; /* = [this.waiting, this.preparing, this.finish]; */

  constructor(
    public dialog: MatDialog,
    private mesaApi: TableService
    ) { }

  verObservacao(quadroId: string, itemId: number) {
    const quadro = this.quadros.find((qua) =>
          qua.id === quadroId
    );

    const element = quadro.pedidos.find((pedido) =>
          pedido.id === itemId
    );
    this.dialog.open(SeeObservationDialogComponent, {
      width: '300px',
      data: {name: element.nomeProduto, observation: element.observation }
    });

    /* dialogRef.afterClosed().subscribe(result => {
    });    */
  }

  get quadrosId(): string[] {
    return this.quadros.map(quadro => quadro.id);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  ngOnInit(): void {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.mesaApi.getByEstablishmentId(currentUser.estabelecimentoId).subscribe((data: Table[]) => {
      const tables = data;

      if (tables) {
        tables.forEach(table => {
          table.comandas.forEach(comanda => {
            if (comanda.enumsituacaocomanda === EnumSituacaoComanda.Ativa) {
              comanda.pedidos.forEach(pedido => {
                pedido.itens.forEach(item => {
                  if (!item.entregue) {
                    const itemToDo = {
                      id: item.id,
                      nomeProduto: item.produto.nome,
                      mesa: table.numero,
                      observation: item.observacoes
                    };
                    this.waiting.pedidos.push(itemToDo);
                  }
                });
              });
            }
          });
        });
      }

      this.quadros = [this.waiting, this.preparing, this.finish];

    });
  }

}
