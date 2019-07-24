import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { statusOptions } from 'src/app/models/Table';

interface AddTableDialogData {
  text: string;
  numero: number;
  codigo: string;
}

@Component({
  selector: 'app-partner-add-table.component',
  templateUrl: 'partner-add-table-dialog.component.html',
})
export class PartnerAddTableDialogComponent {
  statusOptions = statusOptions;

  constructor(public dialogRef: MatDialogRef<PartnerAddTableDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: AddTableDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.numero || this.data.codigo) {
      this.dialogRef.close(this.data);
    }
  }
}
