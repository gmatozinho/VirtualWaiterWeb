import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AddDialogData {
  name: string;
  quantity: number;
  observation: string;
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: 'add-item-dialog.component.html',
})
export class AddItemDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: AddDialogData) { }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    submit() {
      if (this.data.quantity) {
        const result = {
          quantity: Number(this.data.quantity),
          observation: this.data.observation
        };

        this.dialogRef.close(result);
      }
    }
}
