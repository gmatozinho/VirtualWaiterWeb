import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Establishment';
import { CurrentUser } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-partner-init',
  templateUrl: './partner-init.component.html',
  styleUrls: ['./partner-init.component.scss']
})
export class PartnerInitComponent implements OnInit {

  establishment: Establishment;
  showPlans: boolean;
  welcomeCardMessage: string;
  userName: string;
  initArray = 0;

  basicPlanTitle = 'Plano Básico';
  basicPlanAvatar = 'assets/baseline-account_balance-24px.svg';
  basicPlanText = `Cadastre até 6 Mesas. Acesso à todas as funcionalidades do Sistema. Mínimo de 1
  ano de contrato. Primeiros 3 Meses apenas R$ 49,90. Nove meses seguintes R$ 69,90.`;

  intermediantePlanTitle = 'Plano Intermediário';
  intermediantePlanAvatar = 'assets/baseline-account_balance-24px.svg';
  intermediantePlanText = `Cadastre até 12 Mesas. Acesso à todas as funcionalidades do Sistema. Mínimo 1 ano de
  contrato. Primeiros 3 Meses apenas R$ 49,90. Nove meses seguintes R$ 89,90.`;

  masterPlanTitle = 'Plano Superior';
  masterPlanAvatar = 'assets/baseline-account_balance-24px.svg';
  masterPlanText = `Cadastro sem limite de mesas. Acesso à todas as funcionalidades do Sistema. Mínimo 2
  anos de contrato. Primeiros 6 meses apenas RS$ 49,90. Dezoito meses seguintes R$ 99,90.`;


  constructor(private establishmentApi: EstablishmentService) { }

  setActive(establishmentActive: boolean, employeeType: number) {
    if (!establishmentActive && employeeType === 1) {
      this.showPlans = true;
    } else {
      this.showPlans = false;
    }

  }


  setWelcomeMessage(name: string) {
    this.welcomeCardMessage = `Bem-vindo, ${name}
    Que bom que você chegou! Seja muito
    bem-vindo, e que sua jornada por aqui seja
    longa e repleta de bons frutos! Espero que
    possamos progredir juntos, evoluir lado a lado
    e crescer como iguais. Seremos um time, e a
    partir de hoje você é parte da nossa equipe!`;
  }

  goToBasicUrl(): void {
    location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3L69VHEA42D3U';
  }

  goToMediumUrl(): void {
    location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=986WT38SDKS4N';
  }

  goToMasterUrl(): void {
    location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F8PVVHC54RUQ4';
  }

  ngOnInit(): void {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userName = currentUser.nome;
    this.establishmentApi.getById(currentUser.estabelecimentoId).subscribe((data) => {
      this.establishment = data[this.initArray];
      currentUser.estabelecimentoAtivo = this.establishment.ativo;
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

      this.setWelcomeMessage(this.establishment.nome);
      this.setActive(this.establishment.ativo, currentUser.enumtipofuncionario);
    });


  }

}
