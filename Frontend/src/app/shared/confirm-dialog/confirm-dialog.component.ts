import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog-data";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  dialogRef=inject(MatDialogRef<ConfirmDialogComponent>)

  data:DialogData = inject(MAT_DIALOG_DATA)

  close(answer:boolean){
    this.dialogRef.close(answer);
  }
}
