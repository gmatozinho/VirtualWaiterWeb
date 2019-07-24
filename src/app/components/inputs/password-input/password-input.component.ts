import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  hide = true;

  @Input() inputPlaceholder: string;
  @Input() inputHint: string;

  constructor() { }

  ngOnInit(): void {
  }

}
