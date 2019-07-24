import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  name: string;
  observation: string;
  text: string;
}

@Component({
  selector: 'app-partner-confirmation-dialog.component',
  templateUrl: 'partner-confirmation-dialog.component.html',
})
export class PartnerConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<PartnerConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
  }
}
