import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishment.service';


@Component({
  selector: 'app-partner-dashboard',
  styleUrls: ['./partner-dashboard.component.scss'],
  templateUrl: './partner-dashboard.component.html',
})
export class PartnerDashboardComponent implements OnInit {
  positivo = 'trending_up';
  negativo = 'trending_down';
  neutral = 'trending_flat';
  positivoCor = 'green';
  negativoCor = 'red';
  neutralCor = 'black';
  pedidosAbertos = 30;
  vendaMesValue = 30000;
  vendaHojeValue = -2000;
  vendaHojeIcon: string;
  vendaMesIcon: string;

  logo: string;
  name: string;
  arrayPos = 0;
  data: any;
  options: any;
  private zero = 0;
  private numbers: number[] = [65, 59, 80, 81, 56, 10];
  constructor(private establishmentApi: EstablishmentService) {
    this.vendaHojeIcon = this.setValueIcon(this.vendaHojeValue);
    this.vendaMesIcon = this.setValueIcon(this.vendaMesValue);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.establishmentApi.getById(currentUser.estabelecimentoId).subscribe((data) => {
      const establishment = data[this.arrayPos];

      this.logo = establishment.logo;
      this.name = establishment.nome;
    });

    this.data = {
      labels: ['Mc Fritas', 'Coca Cola', 'Wic Mac', 'Açai', 'Fanta', 'Aipim'],
      datasets: [
          {
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.numbers
          }
      ]
    };

    this.options = {
      legend: {display: false},
      title: {
          display: true,
          text: 'Mais Vendidos',
          fontSize: 16
      }
    };
  }

  setValueIcon(value: number): string {
    if (value < this.zero) {
      return this.negativo;
    } else if (value > this.zero) {
      return this.positivo;
    } else {
      return this.neutral;
    }
  }

  ngOnInit(): void {
  }

}
