import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-card-kitchen-item',
  templateUrl: './list-card-kitchen-item.component.html',
  styleUrls: ['./list-card-kitchen-item.component.scss']
})
export class ListCardKitchenItemComponent implements OnInit {

  @Input() itemName: string;
  @Input() itemTable: string;

  constructor() { }

  ngOnInit(): void {
  }

}
