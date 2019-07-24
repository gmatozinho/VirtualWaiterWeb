import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button-menu',
  templateUrl: './icon-button-menu.component.html',
  styleUrls: ['./icon-button-menu.component.scss']
})
export class IconButtonMenuComponent implements OnInit {
  @Input() buttonIcon: string;
  @Input() buttonText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
