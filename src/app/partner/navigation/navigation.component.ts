import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, CurrentUser } from 'src/app/services/authentication.service';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Router } from '@angular/router';
import { EnumOrigemCriacao } from 'src/app/models/EnumOrigemCriacao';

export interface ButtonsData {
  Icon: string;
  Text: string;
  Url: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;

  currentUser: CurrentUser;
  toggled = false;
  dashboard: ButtonsData = {
    Icon: 'fas fa-home',
    Text: 'Dashboard',
    Url: 'dashboard'
  };

  kitchen: ButtonsData = {
    Icon: 'fas fa-utensils',
    Text: 'Cozinha',
    Url: 'cozinha'
  };

  tables: ButtonsData = {
    Icon: 'fas fa-table',
    Text: 'Mesas',
    Url: 'mesas'
  };

  control: ButtonsData = {
    Icon: 'fas fa-clipboard-list',
    Text: 'Comandas',
    Url: 'comandas'
  };

  employees: ButtonsData = {
    Icon: 'fas fa-people-carry',
    Text: 'Funcionários',
    Url: 'funcionarios'
  };

  reports: ButtonsData = {
    Icon: 'fas fa-chart-line',
    Text: 'Relatórios',
    Url: 'relatorios'
  };

  products: ButtonsData = {
    Icon: 'fas fa-concierge-bell',
    Text: 'Cardápio',
    Url: 'cardapio'
  };

  owner: ButtonsData = {
    Icon: 'fas fa-crown',
    Text: 'Dono',
    Url: 'dono'
  };

  navigationButtons: ButtonsData[];

  navigationButtonsOwner: ButtonsData[] = [
    this.dashboard,
    this.kitchen,
    this.tables,
    this.control,
    this.employees,
    this.reports,
    this.products,
    this.owner
  ];

  navigationButtonsManager: ButtonsData[] = [
    this.dashboard,
    this.kitchen,
    this.tables,
    this.control,
    this.employees,
    this.reports,
    this.products,
  ];

  navigationButtonsEmployee: ButtonsData[] = [
    this.dashboard,
    this.kitchen,
    this.tables,
    this.control,
    this.products,
  ];

  screnmaxsize = 840;
  screenWidth: number;
  logo: string;
  name: string;
  arrayPos = 0;
  constructor(
    private authenticationApi: AuthenticationService,
    private establishmentApi: EstablishmentService,
    private router: Router, ) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };

    if (this.screenWidth > this.screnmaxsize) {
      this.toggled = false;
    } else {
      this.toggled = true;
    }

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser.enumtipofuncionario === 1) {
      if (this.currentUser.enumorigemcriacao === 1) {
        this.navigationButtons = this.navigationButtonsOwner;
      } else {
        this.navigationButtons = this.navigationButtonsManager;
      }
    } else {
      this.navigationButtons = this.navigationButtonsEmployee;
    }

    this.establishmentApi.getById(this.currentUser.estabelecimentoId).subscribe((data) => {
      const establishment = data[this.arrayPos];
      this.logo = establishment.logo;
      this.name = establishment.nome;
    });
  }

  sidenavToogleClose() {
    if (this.toggled) {
      this.sidenav.close();
    }
  }

  sidenavToogle() {
    this.toggled = true;
    this.sidenav.toggle();
  }

  titleClick() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
      this.router.navigate(['/parceiro/inicio']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  editEstablishment() {
    if (this.currentUser.enumtipofuncionario === 1) {
      this.router.navigate(['/parceiro/estabelecimento']);
    } else {
      alert('Não Autorizado');
    }

  }

  logout() {
    this.authenticationApi.logout();
  }

  ngOnInit(): void {
  }

}
