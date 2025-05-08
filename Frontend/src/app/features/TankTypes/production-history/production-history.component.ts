import {Component, inject} from '@angular/core';
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
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {User} from "../../../core/interfaces/users/user";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {UserService} from "../../../core/services/user.service";
import {DatePipe} from "@angular/common";

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
    DatePipe
  ],
  templateUrl: './production-history.component.html',
  styleUrl: './production-history.component.css'
})
export class ProductionHistoryComponent {
  //services
  tankService = inject(TankServiceService)
  userService = inject(UserService)


  //variables
  columnsToDisplay:string[]=['nombre', 'operario', 'fecha', 'acciones']
  tankHistory:Tank[]=[]
  totalTanks: number=0;
  pageSize:number=5
  currentPage:number = 0

  tankTypeList:TankType[]=[];
  userList:User[]=[]


  //methods
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
        console.log('we recive this: ', response)

        this.tankHistory = response.content
        this.totalTanks = response.totalElements
      },
      error: error => {
        console.error('there has been an error when fetching tanks. ', error)
      }
    })
  }

  deleteTank(id:number) {
    if (confirm("esto borrara el tanque en el registro pero no devolvera los insumos consumidos a la base de datos. es algo que debera hacer manualmente")){
      this.tankService.deleteTank(id).subscribe({
        next: result => {
          console.log('the tank was deleted')
          this.loadHistory()
        },
        error: err => {
          console.log(err);
        }
      })
    }
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
