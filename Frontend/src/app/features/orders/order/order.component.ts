import {Component, inject} from '@angular/core';
import {Order} from "../../../core/interfaces/orders/order";
import {OrdersService} from "../../../core/services/orders.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {CurrencyPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {Client} from "../../../core/interfaces/client/client";
import {ClientService} from "../../../core/services/client.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatCardActions,
    MatRowDef,
    MatHeaderRowDef,
    DatePipe,
    TitleCasePipe,
    CurrencyPipe,
    MatButton,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  //servicce
  private orderService = inject(OrdersService)
  private activatedRoute = inject(ActivatedRoute)
  private clientService = inject(ClientService)
  private tankService = inject(TankServiceService)
  private router = inject(Router)
  //variables
  order:Order= {
    id: 0,
    createdDate: '',
    lastUpdatedAt: '',
    orderDate: '',
    clientId: 0,
    orderDetails: [],
    totalPrice: 0,
    state: ''
  }
  private id: number = 0;
  private clientList:Client[] = []
  private tankTypeList:TankType[]=[]

  //method
  get clientName(): string | undefined {
    return this.clientList.find(cl=>cl.id ===this.order.clientId)?.name
  }

  ngOnInit(): void {
    this.loadInfo()
    this.extra()
  }

  private extra() {
    this.clientService.getClientList().subscribe({
      next: data => {
        this.clientList = data
      },
      error: err => {
        console.log(err)
      }
    })
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypeList = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private loadInfo() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (id) {
      this.id = id
      this.loadOrder()
    }
  }

  private loadOrder() {
    this.orderService.getById(this.id).subscribe({
      next: response => {
        this.order = response
      },
      error: error => {
        console.error(error)
      }
    })
  }

  cancelOrder() {
    if (confirm("Are you sure you want to cancel the order?")) {
      this.orderService.cancelOrder(this.id).subscribe({
        next: response => {
          console.log('order cancelled ', response);
          this.loadOrder()
        },
        error: error => {
          console.error(error)
        }
      })
    }
  }

  getTankTypeName(id:number):string|undefined{
    return this.tankTypeList.find(tt=>tt.id===id)?.type
  }

  edit() {
    this.router.navigate(['/orders/'+this.id+'/edit'])
  }
}
