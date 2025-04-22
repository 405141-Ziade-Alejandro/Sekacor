import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTextColumn
} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-tank-type-list',
  standalone: true,
  imports: [
    MatTable,
    MatToolbar,
    MatIcon,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatTextColumn,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatMiniFabButton,
    RouterLink
  ],
  templateUrl: './tank-type-list.component.html',
  styleUrl: './tank-type-list.component.css'
})
export class TankTypeListComponent {
  tankTypes = ["marco", "polo", "farco"]
  colums=["name"]
}
