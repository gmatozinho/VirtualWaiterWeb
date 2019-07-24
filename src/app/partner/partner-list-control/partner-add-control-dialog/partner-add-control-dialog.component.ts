import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Table } from 'src/app/models/Table';

export interface ControlDialogData {
  mesas: Table[];
  mesa: number;
  mesaId: number;
  nome: string;
  celular: string;
}

@Component({
  selector: 'app-partner-add-control.component',
  templateUrl: 'partner-add-control-dialog.component.html',
})
export class PartnerAddControlDialogComponent {
  constructor(public dialogRef: MatDialogRef<PartnerAddControlDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: ControlDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.data.mesa = this.data.mesas.find((table) => {
      return table.id === this.data.mesaId;
    }).numero;

    if (this.data.mesa || this.data.nome || this.data.celular || this.data.mesaId) {
      this.dialogRef.close(this.data);
    }
  }
}
