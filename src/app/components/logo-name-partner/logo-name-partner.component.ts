import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo-name-partner',
  templateUrl: './logo-name-partner.component.html',
  styleUrls: ['./logo-name-partner.component.scss']
})
export class LogoNamePartnerComponent implements OnInit {

  @Input() nameEstablishment: string;
  @Input() logoEstablishment: string;

  constructor() { }

  ngOnInit(): void {
  }

}
