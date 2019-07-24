import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SimpleControlDialogData {
  nome: string;
  celular: string;
}

@Component({
  selector: 'app-partner-add-control-simple.component',
  templateUrl: 'partner-add-control-simple-dialog.component.html',
})
export class PartnerAddControlSimpleDialogComponent {
  constructor(public dialogRef: MatDialogRef<PartnerAddControlSimpleDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: SimpleControlDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.nome || this.data.celular) {
      this.dialogRef.close(this.data);
    }
  }
}
