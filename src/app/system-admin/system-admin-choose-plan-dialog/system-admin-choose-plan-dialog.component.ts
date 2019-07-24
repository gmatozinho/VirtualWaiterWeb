import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plan } from 'src/app/models/Plan';

export interface ChoosePlanDialogData {
  plans: Plan[];
  planId: number;
}

@Component({
  selector: 'app-system-admin-choose-plan.component',
  templateUrl: 'system-admin-choose-plan-dialog.component.html',
})
export class SystemAdminChoosePlanDialogComponent {
  constructor(public dialogRef: MatDialogRef<SystemAdminChoosePlanDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: ChoosePlanDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.planId) {
      this.dialogRef.close(this.data.planId);
    }
  }
}
