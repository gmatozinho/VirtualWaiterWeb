import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-text-icon-card',
  templateUrl: './rounded-text-icon-card.component.html',
  styleUrls: ['./rounded-text-icon-card.component.scss']
})
export class RoundedTextIconCardComponent implements OnInit {

  @Input() cardAvatar1: string;
  @Input() cardTitle1: string;
  @Input() cardText1: string;

  constructor() { }

  ngOnInit() {
  }

}
