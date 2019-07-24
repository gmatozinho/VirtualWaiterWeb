import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/services/authentication.service';
import { ReportService } from 'src/app/services/report.service';

interface SalesPerYear {
  Total: number;
  Ano: number;
}

@Component({
  selector: 'app-sales-per-year',
  templateUrl: './sales-per-year.component.html',
  styleUrls: ['./sales-per-year.component.scss']
})
export class SalesPerYearComponent implements OnInit {

  data: any;
  options: any;
  labels: string[] = [];
  total: number[] = [];
  invalid = -1;

  constructor(private reportApi: ReportService) {
  }

  ngOnInit() {
    let currentUser: CurrentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.reportApi
    .getSalesPerYear(currentUser.estabelecimentoId)
    .subscribe((data: SalesPerYear[]) => {

      data.forEach(element => {
        const index = this.labels.findIndex(item => item === element.Ano.toString());

        if (index !== this.invalid) {
          this.total[index] += Number(element.Total);
        } else {
          this.labels.push(element.Ano.toString());
          this.total.push(Number(element.Total));
        }
      });

      this.data = {
        labels: this.labels,
        datasets: [
            {
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
              ],
              data: this.total
            }
        ]
      };

      this.options = {
        title: {
            display: true,
            text: 'Total de Vendas por ano',
            fontSize: 16
        }
      };
    });
  }

}
