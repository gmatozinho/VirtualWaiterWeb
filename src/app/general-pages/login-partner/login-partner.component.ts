import { Component, OnInit } from '@angular/core';
import { GeneralPagesToolbarService } from '../general-pages-toolbar/general-pages-toolbar.service';

@Component({
  selector: 'app-login-partner',
  templateUrl: './login-partner.component.html',
  styleUrls: ['./login-partner.component.scss']
})
export class LoginPartnerComponent implements OnInit {
  cardTitleLoginAdm = 'Acesse seu estabelecimento';
  entrar = false;

  constructor(private generalPagesToolbarService: GeneralPagesToolbarService) { }

  ngOnInit(): void {
    this.generalPagesToolbarService.itsLogin(true);
  }

}
