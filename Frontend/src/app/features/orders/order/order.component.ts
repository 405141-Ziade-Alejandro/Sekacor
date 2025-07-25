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
import {DialogService} from "../../../core/services/dialog.service";

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
  private dialogService = inject(DialogService)
  //variables
  order: Order = {
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
  private clientList: Client[] = []
  private tankTypeList: TankType[] = []

  //method
  get clientName(): string | undefined {
    return this.clientList.find(cl => cl.id === this.order.clientId)?.name
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
    this.dialogService.confirm('cancelar order','esta por cancelar la orden, seguro?')
      .subscribe(ok=> {
        if (ok){
          this.orderService.cancelOrder(this.id).subscribe({
            next: data => {
              this.dialogService.alert('Exito','la orden N#'+data.id+' fue cancelada correctamente').subscribe()
              this.loadOrder()
            },
            error: err => {
              console.error(err)
            }
          })
        }
      })
  }

  getTankTypeName(id: number): string | undefined {
    return this.tankTypeList.find(tt => tt.id === id)?.type
  }

  edit() {
    this.router.navigate(['/orders/' + this.id + '/edit'])
  }

  back() {
    this.router.navigate(['/orders/all'])
  }

  complete() {
    this.dialogService.confirm('Finalizar pedido','desea marcar esta orden como completada?')
      .subscribe(ok=>{
        if (ok){
          this.orderService.completeORder(this.id).subscribe({
            next: data => {
              this.dialogService.alert('Exito','Esta orden fue completada exitosamente').subscribe()
              this.order = data
            },
            error: err => {
              if (err.status === 409){
                this.dialogService.alert('Error en el stock','no hay suficiente stock para completar este pedido')
              } else {
                console.error(err)
              }
            }
          })
        }
      })
  }
}
