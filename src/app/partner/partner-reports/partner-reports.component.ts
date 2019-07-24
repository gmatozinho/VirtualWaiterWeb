import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface TabelaRelatorios {
  area: string;
  tipo: string;
  botao: string;
}

@Component({
  selector: 'app-partner-reports',
  templateUrl: './partner-reports.component.html',
  styleUrls: ['./partner-reports.component.scss']
})
export class PartnerReportsComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'area', 'botao'];
  relatorios: TabelaRelatorios[] = [
    {tipo: 'Por Ano', area: 'Vendas', botao: 'vendas-por-ano'},
    {tipo: 'Por Dia Mês Atual', area: 'Vendas', botao: 'vendas-por-dia-mes-atual'}
  ];
  dataSource: MatTableDataSource<TabelaRelatorios> = new MatTableDataSource(this.relatorios);

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
