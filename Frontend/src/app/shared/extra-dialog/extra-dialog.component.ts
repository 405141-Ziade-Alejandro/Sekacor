import {Component, inject} from '@angular/core';
import {Extras} from "../../core/interfaces/extras";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-extra-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './extra-dialog.component.html',
  styleUrl: './extra-dialog.component.css'
})
export class ExtraDialogComponent {
  data:Extras = inject(MAT_DIALOG_DATA)
}
