import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatList, MatListItem} from "@angular/material/list";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCard, MatCardContent} from "@angular/material/card";
import {OrderDetail} from "../../../core/interfaces/orders/order-detail";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OrdersService} from "../../../core/services/orders.service";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {Client} from "../../../core/interfaces/client/client";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {ClientService} from "../../../core/services/client.service";
import {CurrencyPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Order} from "../../../core/interfaces/orders/order";
import {Router} from "@angular/router";
import {DialogService} from "../../../core/services/dialog.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PricesService} from "../../../core/services/prices.service";
import {PriceList} from "../../../core/interfaces/prices/price-list";

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    MatList,
    MatListItem,
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatIcon,
    MatFabButton,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCell,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatMiniFabButton,
    CurrencyPipe,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  //form
  formOrder: FormGroup = new FormGroup({
    clientId: new FormControl('', [Validators.required]),
    orderDate: new FormControl('', [Validators.required]),
  })
  //services
  orderService = inject(OrdersService)
  tankService = inject(TankServiceService)
  clientService = inject(ClientService)
  router = inject(Router);
  dialogService = inject(DialogService)
  priceService = inject(PricesService)
  //variables
  columnToDisplay: string[] = ['product', 'quantity', 'price', 'action'];
  clientList: Client[] = [];
  typeTankList: TankType[] = [];
  detailList: OrderDetail[] = [];
  priceListList:PriceList[]=[]
  currentDate = new Date();

  isLoading: boolean = false;

  //methods

  get isClientSelected(): boolean {
    return this.formOrder.get('clientId')?.valid ?? false;
  }

  ngOnInit() {
    this.loadData()
    this.setupFormListeners()
  }

  private setupFormListeners() {
    this.formOrder.get('clientId')?.valueChanges.subscribe(()=>{
      this.detailList=[]
    })
  }

  private loadData() {
    this.clientService.getClientList().subscribe(data => {
      this.clientList = data;
    })
    this.tankService.getAllTankTypes().subscribe(data => {
      this.typeTankList = data;
    })
    this.priceService.getAllPrices().subscribe(data => {
      this.priceListList = data;
    })
  }

  addTank(index: number) {
    let tankType: TankType = this.typeTankList[index];

    let check = this.detailList.find(dtl => dtl.typeTankId === tankType.id)
    if (check) {

      check.quantity = check.quantity + 1;

    } else {
      const newDetail: OrderDetail = {
        price: this.calculatePrice(tankType),
        quantity: 1,
        typeTankId: tankType.id
      }

      this.detailList = [...this.detailList, newDetail];
    }
  }

  /**
   * this reduces the tank by 1 if there many tanks in the list
   * otherwise it removes the tanktype from the list completely
   * @param detail
   */
  reduceTank(detail: OrderDetail) {
    if (detail.quantity > 1) {
      detail.quantity--;
    } else {
      let index = this.detailList.indexOf(detail);
      this.detailList.splice(index, 1)
      this.detailList = [...this.detailList];
    }
  }

  get totalPrice(): number {

    let total: number = 0

    for (let detailListElement of this.detailList) {
      total += detailListElement.price * detailListElement.quantity;
    }

    return total
  }

  sendOrder() {
    if (this.formOrder.invalid || this.detailList.length < 1) {
      if (this.detailList.length < 1) {
        this.dialogService.alert('Error', 'Debe por lo menos tener un tipo de tanque en la orden').subscribe()
      } else {
        alert('this formulary is invalid')
      }

    } else if (this.formOrder.valid) {
      this.isLoading = true;
      const newOrder: Order = {
        ...this.formOrder.value,
        orderDate: this.toLocalDateTimeString(this.formOrder.value.orderDate)
      }
      newOrder.orderDetails = this.detailList
      newOrder.totalPrice = this.totalPrice

      this.orderService.postOrder(newOrder).subscribe({
        next: (responce) => {
          // console.log('order saved: ', responce);
          this.dialogService.alert('Exito', 'La orden se creo exitosamente').subscribe()
          this.formOrder.reset()
          this.detailList = []
          this.isLoading = false
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false
        }
      })
    }
  }

  /**
   * this makes sure the date is send on the dto is accepted by the backend
   * otherwise a parse error occurs
   * @param date
   */
  toLocalDateTimeString(date: Date): string {
    return date.toISOString().slice(0, 19);
  }

  leave() {
    this.router.navigate(['/']);
  }

  getTankName(id: number): string {
    const tankType = this.typeTankList.find(tt => tt.id === id)
    return tankType ? tankType.type + " | " + tankType.cover + " | " + tankType.quantity : "tanque borrado"
  }

  //this is what needs
  private calculatePrice(tank: TankType) {
    const clientId = this.formOrder.get('clientId')?.value;

    if (clientId) {
      const client = this.clientList.find(c=>c.id === clientId);
      if (client) {
        const priceList = this.priceListList.find(pl=>pl.id===client.priceListId)
        if (priceList) {
          let price = ((tank.cost + priceList.profit) * priceList.commission) + (priceList.corralon * priceList.profit);
          if (priceList.volKm === "CIEN") {
            price = price + tank.vol100
          } else if (priceList.volKm === "DOSCIENTOS") {
            price = price + tank.vol200
          }
          // price = +(price / this.dolar).toFixed(2)  not necesary since it won't  be tied to the dolar
          return price
        }
        return 0
      }
    }
    return 0
  }
}
