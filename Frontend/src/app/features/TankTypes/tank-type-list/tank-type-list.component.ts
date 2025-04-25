import {Component, inject} from '@angular/core';
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
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {TankType} from "../../../core/interfaces/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {MatCard, MatCardContent} from "@angular/material/card";


@Component({
  selector: 'app-tank-type-list',
  standalone: true,
  imports: [
    MatTable,
    MatToolbar,
    MatIcon,
    MatMiniFabButton,
    RouterLink,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCard,
    MatCardContent,
    MatButton
  ],
  templateUrl: './tank-type-list.component.html',
  styleUrl: './tank-type-list.component.css'
})
export class TankTypeListComponent {
  //services
  tankService = inject(TankServiceService)
  router = inject(Router)
  //variables
  tankTypesList: TankType[] = []

  columsToDisplay: string[] = ['type','cover','quantity', 'cost', 'stock','actions']

  //methods

  ngOnInit(): void {
    this.loadTanks()
  }

  private loadTanks() {
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypesList = data
        console.log(data)
      }
    })
  }

  delete(id:number) {
    //todo, do this with a pop up or just more user friendly
    if (confirm("Vas a BORRAR PERMANENTEMENTE este tipo de tanque con todos sus datos, continuar?")) {
      this.tankService.deleteTankType(id).subscribe({
        next: () => {
          alert("Tanque borrado");
          this.loadTanks()
        },
        error: err => {
          console.log(err);
          alert("error!");
        }
      })
    }

  }

  edit(id:number) {
    this.tankService.setUpdating(true);
    this.router.navigate([`tanktypes/${id}`])
  }
}
