import {Component, inject} from '@angular/core';
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-examine-tank-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatDialogContent,
    MatDialogTitle,
    MatCardFooter,
    DatePipe
  ],
  templateUrl: './examine-tank-dialog.component.html',
  styleUrl: './examine-tank-dialog.component.css'
})
export class ExamineTankDialogComponent {
  tankType:TankType = inject(MAT_DIALOG_DATA)
}
