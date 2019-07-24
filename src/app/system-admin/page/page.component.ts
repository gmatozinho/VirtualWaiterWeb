import { Component, OnInit } from '@angular/core';
/* import { ToolbarService } from '../../components/toolbar/toolbar.service'; */

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(/* private toolbarService: ToolbarService */) {
  }

  ngOnInit(): void {
    /* this.toolbarService.showNameAndLogo(true); */
  }

}
