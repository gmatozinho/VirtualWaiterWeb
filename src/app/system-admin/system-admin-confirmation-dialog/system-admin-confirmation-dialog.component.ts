import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  name: string;
  text: string;
}

@Component({
  selector: 'app-system-admin-confirmation-dialog.component',
  templateUrl: 'system-admin-confirmation-dialog.component.html',
})
export class SystemAdminConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<SystemAdminConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
  }
}
