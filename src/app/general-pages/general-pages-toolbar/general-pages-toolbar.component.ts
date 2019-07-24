import { Component, OnInit } from '@angular/core';
import { GeneralPagesToolbarService } from './general-pages-toolbar.service';


@Component({
  selector: 'app-general-pages-toolbar',
  styleUrls: ['./general-pages-toolbar.component.scss'],
  templateUrl: './general-pages-toolbar.component.html',

})
export class GeneralPagesToolbarComponent implements OnInit {
  entrar = true;
  cadastrar = true;

  constructor(private generalPagesToolbarService: GeneralPagesToolbarService) { }

  ngOnInit(): void {
    this.generalPagesToolbarService.onToolbar().subscribe(
      (itsLogin) => {
          if (itsLogin) {
              // Logic to start login page
              this.showEntrar(false);
              this.showCadastrar(true);

          } else {
              // Logic to star not login page
              this.showEntrar(true);
              this.showCadastrar(false);
          }
      }
    );
  }

  clickHome(): void {
    this.showEntrar(true);
    this.showCadastrar(true);
  }

  clickEntrar(): void {
    this.showEntrar(false);
    this.showCadastrar(true);
  }

  clickCadastrar(): void {
    this.showEntrar(true);
    this.showCadastrar(false);
  }

  showEntrar(show: boolean) {
    this.entrar = show;
  }

  showCadastrar(show: boolean) {
    this.cadastrar = show;
  }
}
