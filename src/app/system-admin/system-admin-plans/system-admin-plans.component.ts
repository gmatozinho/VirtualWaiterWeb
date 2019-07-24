import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/Plan';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';
import { SystemAdminPlanDialogComponent } from './system-admin-plan-dialog/system-admin-dialog.component';

@Component({
  selector: 'app-system-admin-plans',
  templateUrl: './system-admin-plans.component.html',
  styleUrls: ['./system-admin-plans.component.scss']
})
export class SystemAdminPlansComponent implements OnInit {
  plans: Plan[] = [];
  plansDisplayedColumns: string[] = ['nome', 'valor', 'duracao', 'editar'];
  plansDataSource: MatTableDataSource<Plan> = new MatTableDataSource();
  zero = 0;
  invalidPos = -1;

  constructor(public dialog: MatDialog,
              private planApi: PlanService ) { }

  addPlan() {
    const dialogTitle = 'Novo Plano';
    const buttonText = 'Adicionar';
    const dialogText = 'Insira as informações do novo plano:';
    const plan: Plan = {
      nome: '',
      descricao: '',
      valor: 0,
      duracao: 0
    };
    const dialogRef = this.buildDialogRef(dialogText, plan, dialogTitle, buttonText);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.planApi.create(result).subscribe((data) => {
          alert('Plano Inserido');
          this.plans.push(data);
          this.plansDataSource.data = this.plans;
        });
      }
    });
  }

  editPlan(id: number) {
    const dialogTitle = 'Editar Seção';
    const buttonText = 'Atualizar';
    const dialogText = 'Altere as informações deste plano:';
    const plan = this.plans.find((element) => {
      return element.id === id;
    });
    const dialogRef = this.buildDialogRef(dialogText, plan, dialogTitle, buttonText);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.planApi.update(result).subscribe((data) => {
          const index = this.plans.indexOf(plan);
          if (index > this.invalidPos) {
            this.plans.splice(index, 1);
          }
          alert('Plano Atualizado');
          this.plans.push(data);
          this.plansDataSource.data = this.plans;
        });
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.plansDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.planApi.getAll().subscribe((data) => {
      this.plans = data;

      this.plansDataSource.data = this.plans;
    });
  }

  private buildDialogRef(text: string, plan: Plan, title: string, buttonText: string) {
    return this.dialog.open(SystemAdminPlanDialogComponent, {
      width: '300px',
      data: {plan, text, title, buttonText}
    });
  }

}
