import {Component, inject, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {Tank} from "../../../core/interfaces/tanks/tank";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {User} from "../../../core/interfaces/users/user";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {UserService} from "../../../core/services/user.service";
import {DatePipe} from "@angular/common";
import {DialogService} from "../../../core/services/dialog.service";
import {RouterLink} from "@angular/router";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDivider} from "@angular/material/divider";
import {MatTooltip} from "@angular/material/tooltip";

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
    MatPaginator,
    DatePipe,
    MatButton,
    RouterLink,
    MatSort,
    MatSortHeader,
    MatCardHeader,
    MatCardSubtitle,
    MatDivider,
    MatTooltip,
    MatMiniFabButton
  ],
  templateUrl: './production-history.component.html',
  styleUrl: './production-history.component.css'
})
export class ProductionHistoryComponent {
  //services
  tankService = inject(TankServiceService)
  userService = inject(UserService)
  dialogService = inject(DialogService)


  //variables
  columnsToDisplay:string[]=['typeId', 'userId', 'createdDate', 'acciones']
  tankHistory:Tank[]=[]
  dataSource = new MatTableDataSource<Tank>([])
  totalTanks: number=0;
  pageSize:number=5
  currentPage:number = 0

  tankTypeList:TankType[]=[];
  userList:User[]=[]


  //methods

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadHistory()
    this.loadUsersAndTypes()
  }

  private loadUsersAndTypes() {
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypeList = data
      },
      error: err => {
        console.log(err)
      }
    })
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private loadHistory() {
    this.tankService.getAllTanksPaginated(this.currentPage, this.pageSize).subscribe({
      next: response => {

        this.dataSource.data = response.content
        this.totalTanks = response.totalElements
      },
      error: error => {
        console.error('there has been an error when fetching tanks. ', error)
      }
    })
  }

  deleteTank(id:number) {
    this.dialogService.confirm('Borrar Registro','Esto Borrara el tanque en el registro \n pero no devolvera los insumos consumidos a la base de tados \n eso es algo que se debera hacer manualmente')
      .subscribe(ok=>{
        if (ok){
          this.tankService.deleteTank(id).subscribe({
            next: data => {
              this.dialogService.alert('Borrado Existoso','El registro del tanque fue borrado exitosamente, acuerdece de los insumos').subscribe()
              this.loadHistory()
            },
            error: err => {
              console.log(err)
            }
          })
        }
      })
  }

  changePAge(event: PageEvent) {
    this.pageSize= event.pageSize
    this.currentPage = event.pageIndex
    this.loadHistory()
  }

  getUserName(id:number) {
    return this.userList.find(user => user.id === id)?.name
  }

  getTankType(id:number) {
    const type = this.tankTypeList.find(tt => tt.id === id)
    return type?.type  + " | " + type?.cover + " | " + type?.quantity
  }
}
