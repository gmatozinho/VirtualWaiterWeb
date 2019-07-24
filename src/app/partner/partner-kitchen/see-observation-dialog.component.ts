import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './partner-kitchen.component';
@Component({
  selector: 'app-see-observation-dialog',
  templateUrl: 'see-observation-dialog.component.html',
})
export class SeeObservationDialogComponent {
  constructor(public dialogRef: MatDialogRef<SeeObservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
