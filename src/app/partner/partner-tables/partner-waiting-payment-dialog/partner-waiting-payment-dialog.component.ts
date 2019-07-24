import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface WaitingPaymentDialogData {
  text: string;
}

@Component({
  selector: 'app-waiting-payment-dialog.component',
  templateUrl: 'partner-waiting-payment-dialog.component.html',
})
export class PartnerWaitingPaymentDialogComponent {
  constructor(public dialogRef: MatDialogRef<PartnerWaitingPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
public data: WaitingPaymentDialogData) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
