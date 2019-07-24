import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-icon-card',
  templateUrl: './text-icon-card.component.html',
  styleUrls: ['./text-icon-card.component.scss']
})
export class TextIconCardComponent implements OnInit {

  @Input() cardAvatar: string;
  @Input() cardTitle: string;
  @Input() cardText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
