import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  buttonPartnerIcon = 'fas fa-home';
  buttonOthersIcon = 'fas fa-bookmark';
  buttonPartnerText = 'Parceiros';
  buttonOthersText = 'Planos';

  constructor() {
  }

  ngOnInit(): void {
  }

}
