import {Component, inject, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {OrdersService} from "../../../core/services/orders.service";
import {Order} from "../../../core/interfaces/orders/order";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {literal} from "@angular/compiler";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClientService} from "../../../core/services/client.service";
import {Client} from "../../../core/interfaces/client/client";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {routes} from "../../../app.routes";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatSort, MatSortHeader} from "@angular/material/sort";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatButton,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    RouterLink,
    MatSortHeader,
    MatSort
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  //services
  ordersService = inject(OrdersService)
  clientService = inject(ClientService)
  router= inject(Router)
  //variables
  columnsToDisplay:string[] = ['id','clientId','orderDate','state']
  // orderList:Order[]=[];
  dataSource = new MatTableDataSource<Order>([])
  clientList:Client[]=[];
  totalOrders: number = 0;
  pageSize:number = 5;
  currentPage:number = 0;
  //methods
  @ViewChild(MatSort) sort!: MatSort

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadOrders()
    this.loadClients()
  }

  private loadClients() {
    this.clientService.getClientList().subscribe({
      next: data => {
        this.clientList = data
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private loadOrders() {
    this.ordersService.getAllOrders(this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.dataSource.data = data.content
        this.totalOrders = data.totalElements
      },
      error: err => {
        console.log('there was an error',err);
      }
    })
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex
    this.loadOrders()
  }

  getClientName(id:number):string{
    const client:Client|undefined =  this.clientList.find(c=> c.id === id)

    if(client){
      return client.name
    }

    return "Cliente Borrado"
  }

  examine(id:number) {
    this.router.navigate(['/orders/'+id])
  }
}
