import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Virtual Waiter 2.0';

  firstCardMessage = 'Acelere o Processo de atendimento do seu restaurante e o torne mais atrativo';

  bottonCardTitle1 = 'Você no Controle';
  bottonCardAvatar1 = 'assets/baseline-accessibility_new-24px.svg';
  bottonCardText1 = 'Saiba como está o atendimento do seu restaurante em tempo real.';

  bottonCardTitle2 = 'Gestão Integrada';
  bottonCardAvatar2 = 'assets/baseline-timeline-24px.svg';
  bottonCardText2 = 'Acompanhe as vendas, os números do seu negócio e também gere relatórios.';

  bottonCardTitle3 = 'Customização';
  bottonCardAvatar3 = 'assets/baseline-build-24px.svg';
  bottonCardText3 = 'Customize seu cardápio e as informações sobre seu estabelecimento.';

  constructor() {
  }


  ngOnInit(): void {
  }

}
