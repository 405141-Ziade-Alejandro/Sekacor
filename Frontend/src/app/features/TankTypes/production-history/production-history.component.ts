import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {Tank} from "../../../core/interfaces/tanks/tank";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-production-history',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './production-history.component.html',
  styleUrl: './production-history.component.css'
})
export class ProductionHistoryComponent {
  //services
  //variables
  columnsToDisplay:string[]=['nombre', 'operario', 'fecha', 'ubicacion', 'acciones']
  tankHistory:Tank[]=[]
  totalTanks: number=0;
  //methods
  deleteTank(id:number) {

  }

  changePAge($event: any) {

  }
}
