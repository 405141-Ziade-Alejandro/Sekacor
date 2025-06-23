import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTextColumn
} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatTooltip} from "@angular/material/tooltip";
import {DialogService} from "../../../core/services/dialog.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDivider} from "@angular/material/divider";


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
    MatButton,
    MatTooltip,
    MatSort,
    MatSortHeader,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatDivider
  ],
  templateUrl: './tank-type-list.component.html',
  styleUrl: './tank-type-list.component.css'
})
export class TankTypeListComponent {
  //services
  tankService = inject(TankServiceService)
  router = inject(Router)
  dialogService = inject(DialogService)
  //variables
  dataSource = new MatTableDataSource<TankType>([]);

  columsToDisplay: string[] = ['type','cover','quantity', 'cost', 'stock1','stock2','actions']

  //methods
  @ViewChild(MatSort)  sort!: MatSort

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  ngOnInit(): void {
    this.loadTanks()
  }

  private loadTanks() {
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        // this.tankTypesList = data
        this.dataSource.data = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  delete(id:number) {
    this.dialogService.confirm('BORRAR TANQUE','la siguiente accion BORRARA PERMANENTEMENTE este tipo de tanque, ¿esta seguro que desea continuar?')
      .subscribe( ok=> {
        if (ok) {
          this.tankService.deleteTankType(id).subscribe({
            next: ()=>{
              this.dialogService.alert('Exito', "El Tanque fue borrado exitosamente").subscribe()
              this.loadTanks()
            },
            error: err => {
              console.log(err)
            }
          })
        }
      })

  }

  edit(id:number) {
    this.tankService.setUpdating(true);
    this.router.navigate([`tanktypes/${id}`])
  }
}
