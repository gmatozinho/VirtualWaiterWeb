import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PartnerConfirmationDialogComponent } from '../partner-confirmation-dialog/partner-confirmation-dialog.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { CurrentUser } from 'src/app/services/authentication.service';
import { Establishment } from 'src/app/models/Establishment';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { Item } from 'src/app/models/Item';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

export interface ProductsDataSource {
  id: number;
  nome: string;
  foto: string;
  descricao: string;
  preco: number;
}

@Component({
  selector: 'app-partner-new-request',
  templateUrl: './partner-new-request.component.html',
  styleUrls: ['./partner-new-request.component.scss']
})
export class PartnerNewRequestComponent implements OnInit {
  total = 0;

  cancelarPedidoDialogText = 'Tem certeza que deseja cancelar este pedido?';
  concluirPedidoDialogText = 'Podemos concluir este pedido, não está se esquecendo de nada?';

  displayedColumnsProducts: string[] = ['nome', 'foto', 'descricao', 'preco', 'adicionar'];
  displayedColumnsItens: string[] = ['nome', 'quantidade', 'observacao', 'precoTotal', 'remover'];


  dataSourceProducts = new MatTableDataSource<ProductsDataSource>();
  dataSourceItens = new MatTableDataSource<Item>();

  establishment: Establishment;
  zero = 0;
  nove = 9;
  dois = 2;
  trintaeseis = 36;
  products: ProductsDataSource[] = [];
  order: Order;
  orderItens: Item[] = [];
  currentUser: CurrentUser;

  constructor(public dialog: MatDialog,
              private router: Router,
              private orderApi: OrderService,
              private route: ActivatedRoute,
              private produtoApi: ProductService
    ) { }

  applyFilter(filterValue: string) {
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

  addItem(product: ProductsDataSource) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '320px',
      data: {name: this.currentUser.estabelecimentoNome, observation: '', quantity: 1}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const precoTotal = product.preco * result.quantity;
        const newItem = {
          quantidade: result.quantity,
          observacoes: result.observation,
          preco: product.preco,
          produto: product.id,
          precoTotal,
          nomeProduto: product.nome
        };

        this.orderItens.push(newItem);
        this.dataSourceItens.data = this.orderItens;

        this.calcTotal();
      }
    });
  }

  removeItem(itemRemove: Item) {
    const index: number = this.orderItens.findIndex(item => item === itemRemove);
    this.orderItens.splice(index, 1);
    this.dataSourceItens.data = this.orderItens;
    this.calcTotal();
  }

  subQuantity(itemSub: Item, value: number) {
    const tempValue = value - 1;
    const element = this.orderItens.find((item) =>
          item === itemSub
    );
    if (tempValue === this.zero) {
      this.removeItem(itemSub);
    } else {
      element.quantidade = tempValue;
    }

    this.calcTotal();
  }

  addQuantity(itemAdd: Item, value: number) {
    const tempValue = value + 1;
    const element = this.orderItens.find((item) =>
          item === itemAdd
    );

    element.quantidade = tempValue;

    this.calcTotal();
  }

  calcTotal() {
    let totalTemp = 0;
    this.orderItens.forEach((element) => {
      totalTemp += (element.preco * element.quantidade);
    });

    this.total = totalTemp;
  }

  cancelOrder() {
    const dialogRef = this.buildDialogRef(this.cancelarPedidoDialogText);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/parceiro/visualizar/comanda']);
      }

    });
  }

  finishOrder() {
    const dialogRef = this.buildDialogRef(this.concluirPedidoDialogText);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const newOrder = {
          codigo: '_' + Math.random().toString(this.trintaeseis).substr(this.dois, this.nove),
          datahora: new Date(),
          comanda: this.route.snapshot.params.id,
          itens: this.orderItens
        };
        this.orderApi.create(newOrder).subscribe(() => {
          alert('Pedido Realizado com Sucesso');
          this.router.navigate(['/parceiro/comandas/visualizar/' + this.route.snapshot.params.id]);
        });
      }

    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.produtoApi.getByEstablishmentId(this.currentUser.estabelecimentoId).subscribe((data: Product[]) => {
      const produtos = data;

      produtos.forEach(produto => {
        if (produto.ativo) {
          const productDataSource: ProductsDataSource = {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            foto: produto.foto,
            preco: produto.preco
          };
          this.products.push(productDataSource);
        }
      });

      this.dataSourceProducts.data = this.products;
    });
  }

  private buildDialogRef(texto: string): MatDialogRef<object> {
    return this.dialog.open(PartnerConfirmationDialogComponent, {
      width: '400px',
      data: {text: texto}
    });
  }
}
