import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general-total-button',
  templateUrl: './general-total-button.component.html',
  styleUrls: ['./general-total-button.component.scss']
})
export class GeneralTotalButtonComponent implements OnInit {
  @Input() value: number;

  constructor() { }

  ngOnInit(): void {
  }

}
