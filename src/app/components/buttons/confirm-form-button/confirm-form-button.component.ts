import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-form-button',
  styleUrls: ['./confirm-form-button.component.scss'],
  templateUrl: './confirm-form-button.component.html',
})
export class ConfirmFormButtonComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
