import {Component, inject} from '@angular/core';
import {MissingConsumable} from "../../../core/interfaces/tanks/missing-consumable";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-missing-consumables-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './missing-consumables-dialog.component.html',
  styleUrl: './missing-consumables-dialog.component.css'
})
export class MissingConsumablesDialogComponent {
  data: MissingConsumable[] = inject(MAT_DIALOG_DATA)
  colunmsToDisplay:string[] = ['consumable','stock','missing']

}
