import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import {
  PartnerConfirmationDialogComponent } from '../partner-confirmation-dialog/partner-confirmation-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { employeeTypeOptions, Employee } from 'src/app/models/Employee';
import { Router } from '@angular/router';

interface DataSourceFuncionario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

@Component({
  selector: 'app-partner-employees',
  styleUrls: ['./partner-employees.component.scss'],
  templateUrl: './partner-employees.component.html',
})
export class PartnerEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cargo', 'email', 'deletar', 'editar'];
  arrayPos = 0;
  employees: Employee[];
  forDataSourceEmployees: DataSourceFuncionario[] = [];

  dataSource: MatTableDataSource<DataSourceFuncionario> = new MatTableDataSource();

  invalidindex = -1;
  employeeTypeOptions = employeeTypeOptions;
  constructor(
    public dialog: MatDialog,
    private employeeApi: EmployeeService,
    private router: Router ) {
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.employeeApi.getByEstablishmentId(currentUser.estabelecimentoId).subscribe((data: Employee[]) => {
      this.employees = data;

      this.employees.forEach(element => {
        const funcionario = {
          id: element.id,
          nome: element.nome,
          cargo: this.getEmployeeType(element.enumtipofuncionario),
          email: element.usuario.email
        };

        this.forDataSourceEmployees.push(funcionario);
      });

      this.dataSource.data = this.forDataSourceEmployees;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployeeType(enumtipofuncionario: number) {
    const type = this.employeeTypeOptions.find(employeeType => employeeType.value === enumtipofuncionario);
    return type.name;
  }

  removerFuncionario(id: number, nome: string): void {
    const texto = 'Deseja remover o funcionário: ' + nome;
    const dialogRef = this.buildDialogRef(texto);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index: number = this.employees.findIndex(funcionario => funcionario.id === id);

        this.employeeApi.remove(this.employees[index]).subscribe(() => {
          alert('Funcionário Removido');
          if (index !== this.invalidindex) {
            this.forDataSourceEmployees.splice(index, 1);
            this.employees.splice(index, 1);
          }

          this.dataSource = new MatTableDataSource(this.forDataSourceEmployees);
        });

      }
    });
  }

  editPage(id: string) {
    this.router.navigate(['/parceiro/funcionarios/editar/' + id]);
  }

  private buildDialogRef(texto: string): MatDialogRef<any> {
    return this.dialog.open(PartnerConfirmationDialogComponent, {
      width: '250px',
      data: {text: texto}
    });
  }
}
