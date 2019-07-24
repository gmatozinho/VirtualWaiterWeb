import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { PartnerAddSessionDialogComponent } from './partner-add-session-dialog/partner-add-session-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/Session';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Menu } from 'src/app/models/Menu';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CurrentUser } from 'src/app/services/authentication.service';
import { MenuService } from 'src/app/services/menu.service';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  foto: string;
  ativo: boolean;
  editar: string;
  categoria: string;
}

@Component({
  selector: 'app-partner-menu',
  templateUrl: './partner-menu.component.html',
  styleUrls: ['./partner-menu.component.scss']
})
export class PartnerMenuComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup: { selectedIndex: number; };
  filterActive = true;
  sessionDescription: string;
  sessions: Session[] = [];
  sessionsDisplayedColumns: string[] = ['descricao', 'ativo', 'editar'];
  productsDisplayedColumns: string[] = ['nome', 'categoria', 'preco', 'foto', 'ativo', 'editar'];

  products: Product[] = [];
  checkboxChanged = false;
  checkboxProductChanged = false;
  checkboxSessionChanged = false;
  zero = 0;
  invalidPos = -1;
  productsDataSource: MatTableDataSource<Product> = new MatTableDataSource();
  sessionsDataSource: MatTableDataSource<Session> = new MatTableDataSource();

  constructor(public dialog: MatDialog,
              private router: Router,
              private productApi: ProductService,
              private sessionApi: SessionService,
              private menuApi: MenuService, ) {
    this.productsDataSource.filterPredicate = (data, filter: string): boolean => {
      return data.nome.trim().toLowerCase().includes(filter) ||  data.ativo.toString().includes(filter)
      || data.category.trim().toLowerCase().includes(filter) || data.preco.toString().includes(filter);
    };
  }

  addClick() {
    if (this.tabGroup.selectedIndex === this.zero) {
      this.router.navigate(['/parceiro/cardapio/produto/novo']);
    } else {
      this.addSession();
    }
  }

  applyFilter(filterValue: string): void {
    if (this.tabGroup.selectedIndex === this.zero) {
      this.productsDataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.sessionsDataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  filterActiveF() {
    this.applyFilter(this.filterActive.toString());
  }

  addSession() {
    const dialogTitle = 'Nova Seção';
    const buttonText = 'Adicionar';
    const dialogRef = this.buildDialogRef(this.sessionDescription, dialogTitle, buttonText);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const session: Session = {
          descricao: result,
          cardapio: currentUser.cardapioId,
          ativo: true
        };

        this.sessionApi.create(session).subscribe((data) => {
          this.sessions.push(data);
          this.sessionsDataSource.data = this.sessions;
        });
      }
    });
  }

  editSession(id: number) {
    const dialogTitle = 'Editar Seção';
    const buttonText = 'Atualizar';
    const session = this.sessions.find((element) => {
      return element.id === id;
    });
    const dialogRef = this.buildDialogRef(session.descricao, dialogTitle, buttonText);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        session.descricao = result;

        this.sessionApi.update(session).subscribe((data) => {
          const index = this.sessions.indexOf(session);
          if (index > this.invalidPos) {
            this.sessions.splice(index, 1);
          }
          this.sessions.push(data);
          this.sessionsDataSource.data = this.sessions;
        });
      }
    });
  }

  editProductPage(id: string, session: number) {
    const productSession = {
      session
    };
    sessionStorage.setItem('productSession', JSON.stringify(productSession));
    this.router.navigate(['/parceiro/cardapio/produto/editar/' + id]);
  }

  save() {
    if (this.tabGroup.selectedIndex === this.zero && this.checkboxChanged) {
      this.productApi.updateList(this.products).subscribe(() => {
        alert('Produtos Atualizados');
        this.applyFilter(this.filterActive.toString());
        this.checkboxProductChanged = false;
        this.checkboxChanged = this.checkboxProductChanged;
      });
    } else if (this.tabGroup.selectedIndex === 1 && this.checkboxChanged) {
      this.sessionApi.updateList(this.sessions).subscribe(() => {
        alert('Seções Atualizadas');
        this.applyFilter(this.filterActive.toString());
        this.checkboxSessionChanged = false;
        this.checkboxChanged = this.checkboxSessionChanged;
      });
    }
  }

  onTabChange() {
    this.applyFilter(this.filterActive.toString());
    if (this.tabGroup.selectedIndex === this.zero) {
      this.checkboxChanged = this.checkboxProductChanged;
    } else {
      this.checkboxChanged = this.checkboxSessionChanged;
    }
  }

  changeProduct() {
    this.checkboxProductChanged = !this.checkboxProductChanged;
    this.checkboxChanged = true;
  }

  changeSession() {
    this.checkboxSessionChanged = !this.checkboxSessionChanged;
    this.checkboxChanged = true;
  }

  ngOnInit(): void {
    const currentUser: CurrentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.menuApi.getById(currentUser.cardapioId).subscribe((data) => {
      const menu: Menu = data[this.zero];
      this.sessions = menu.secoes;

      this.sessions.forEach(session => {
        session.produtos.forEach(produto => {
          produto.category = session.descricao;
          produto.secao = session.id;
          this.products.push(produto);
        });
      });

      this.productsDataSource.data = this.products;
      this.sessionsDataSource.data = this.sessions;

      this.applyFilter(this.filterActive.toString());
    });
  }

  private buildDialogRef(text: string, title: string, buttonText) {
    return this.dialog.open(PartnerAddSessionDialogComponent, {
      width: '300px',
      data: {description: text, title, buttonText}
    });
  }

}
