import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SessionDialogData {
  description: string;
  title: string;
  buttonText: string;
}

@Component({
  selector: 'app-partner-add-session.component',
  templateUrl: 'partner-add-session-dialog.component.html',
})
export class PartnerAddSessionDialogComponent {
  constructor(public dialogRef: MatDialogRef<PartnerAddSessionDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: SessionDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.description) {
      this.dialogRef.close(this.data.description);
    }
  }
}
