import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-price-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './create-price-dialog.component.html',
  styleUrl: './create-price-dialog.component.css'
})
export class CreatePriceDialogComponent {
  private dialogRef = inject(MatDialogRef<CreatePriceDialogComponent>)

  close() {
    this.dialogRef.close();
  }
}
