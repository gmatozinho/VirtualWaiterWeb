import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { CurrentUser } from 'src/app/services/authentication.service';

interface SalesPerDayActualMonth {
  Total: number;
  Dia: number;
}

@Component({
  selector: 'app-saler-per-day-in-current-month',
  templateUrl: './saler-per-day-in-current-month.component.html',
  styleUrls: ['./saler-per-day-in-current-month.component.scss']
})
export class SalerPerDayInCurrentMonthComponent implements OnInit {

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
    .getSalesPerDayActualMonth(currentUser.estabelecimentoId)
    .subscribe((data: SalesPerDayActualMonth[]) => {

      data.forEach(element => {
        const index = this.labels.findIndex(item => item === element.Dia.toString());

        if (index !== this.invalid) {
          this.total[index] += Number(element.Total);
        } else {
          this.labels.push(element.Dia.toString());
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
        legend: {display: false},
        title: {
            display: true,
            text: 'Total de Vendas por dia no Mês Atual',
            fontSize: 16
        }
      };
    });
  }


}
