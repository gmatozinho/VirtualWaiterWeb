import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { paymentOptions } from 'src/app/models/Account';

export interface InitAccountDialogData {
  total: number;
  formapagamento: number;
}

@Component({
  selector: 'app-partner-init-account.component',
  templateUrl: 'partner-init-account-dialog.component.html',
})
export class PartnerInitAccountDialogComponent {

  paymentOptions = paymentOptions;

  constructor(public dialogRef: MatDialogRef<PartnerInitAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: InitAccountDialogData) { }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.formapagamento) {
      this.dialogRef.close(this.data);
    }

  }
}
