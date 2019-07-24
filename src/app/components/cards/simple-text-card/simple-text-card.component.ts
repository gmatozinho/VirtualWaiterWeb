import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-simple-text-card',
  templateUrl: './simple-text-card.component.html',
  styleUrls: ['./simple-text-card.component.scss']
})
export class SimpleTextCardComponent implements OnInit {

  @Input() cardText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
