import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plan } from 'src/app/models/Plan';

export interface PlanDialogData {
  text: string;
  title: string;
  buttonText: string;
  plan: Plan;
}

@Component({
  selector: 'app-system-admin-plan.component',
  templateUrl: 'system-admin-plan-dialog.component.html',
})
export class SystemAdminPlanDialogComponent {
  constructor(public dialogRef: MatDialogRef<SystemAdminPlanDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: PlanDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }

  submit() {
    if (this.data.plan.descricao && this.data.plan.duracao && this.data.plan.valor && this.data.plan.nome) {
      this.dialogRef.close(this.data.plan);
    }
  }
}
