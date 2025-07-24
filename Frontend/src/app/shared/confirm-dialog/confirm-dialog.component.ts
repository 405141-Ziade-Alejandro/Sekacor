import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ConfirmDialogData} from "../confirm-dialog-data";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  dialogRef=inject(MatDialogRef<ConfirmDialogComponent>)

  data:ConfirmDialogData = inject(MAT_DIALOG_DATA)

  close(answer:boolean){
    this.dialogRef.close(answer);
  }
}
