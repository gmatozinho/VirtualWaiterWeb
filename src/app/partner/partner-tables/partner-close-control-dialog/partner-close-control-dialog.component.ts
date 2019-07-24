import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { statusOptions } from 'src/app/models/Table';
import { Order } from 'src/app/models/Order';
import { Item } from 'src/app/models/Item';

interface CloseControlDialogData {
  clienteName: string;
  itens: Item[];
  total: number;
}

@Component({
  selector: 'app-partner-close-control.component',
  templateUrl: 'partner-close-control-dialog.component.html',
})
export class PartnerCloseControlDialogComponent {
  statusOptions = statusOptions;

  constructor(public dialogRef: MatDialogRef<PartnerCloseControlDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: CloseControlDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
