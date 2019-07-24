import { Component, OnInit } from '@angular/core';
import { GeneralPagesToolbarService } from '../general-pages-toolbar/general-pages-toolbar.service';

@Component({
  selector: 'app-be-a-partner',
  templateUrl: './be-a-partner.component.html',
  styleUrls: ['./be-a-partner.component.scss']
})
export class BeAPartnerComponent implements OnInit {

  bottonCardTitle1 = 'Seu cliente com a Iniciativa';
  bottonCardAvatar1 = 'assets/baseline-accessibility_new-24px.svg';
  bottonCardText1 = `Atendimento do cliente durante todo
  o tempo sem interrupções e sem intermediários.`;

  bottonCardTitle2 = 'Atendimento Rápido';
  bottonCardAvatar2 = 'assets/exercise-300.png';
  bottonCardText2 = `Seu cliente chega, escolhe a mesa e
  solicita a liberação da comanda.`;

  bottonCardTitle3 = 'Pedidos em Tempo Real';
  bottonCardAvatar3 = 'assets/purchase-order-150.png';
  bottonCardText3 = `O cliente monta o pedido, e o confirma.
  A sua distribuição é automática após ser recebido e liberado`;

  bottonCardTitle4 = 'Plano Básico';
  bottonCardAvatar4 = 'assets/outline-list_alt-24px.svg';
  bottonCardText4 = `Cadastre até 6 Mesas. Acesso à todas as funcionalidades do Sistema.
  Mínimo de 1 ano de contrato. Primeiros 3 Meses
  apenas R$ 49,90. Nove meses seguintes R$ 69,90.`;

  bottonCardTitle5 = 'Plano Intermediário';
  bottonCardAvatar5 = 'assets/outline-list_alt-24px.svg';
  bottonCardText5 = `Cadastre até 12 Mesas. Acesso à todas as funcionalidades do Sistema. Mínimo 1 ano de
  contrato. Primeiros 3 Meses apenas R$ 49,90. Nove meses seguintes R$ 89,90.`;

  bottonCardTitle6 = 'Plano Superior';
  bottonCardAvatar6 = 'assets/outline-list_alt-24px.svg';
  bottonCardText6 = `Cadastro sem limite de mesas. Acesso à todas as funcionalidades do Sistema. Mínimo 2
  anos de contrato. Primeiros 6 meses apenas RS$ 49,90. Dezoito meses seguintes R$ 99,90.`;

  constructor(private generalPagesToolbarService: GeneralPagesToolbarService) { }

  ngOnInit(): void {
    this.generalPagesToolbarService.itsLogin(false);
  }

}
