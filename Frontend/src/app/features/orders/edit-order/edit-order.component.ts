import {Component, inject} from '@angular/core';
import {OrderDetail} from "../../../core/interfaces/orders/order-detail";
import {CurrencyPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Client} from "../../../core/interfaces/client/client";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {OrdersService} from "../../../core/services/orders.service";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {ClientService} from "../../../core/services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../../core/interfaces/orders/order";
import {DialogService} from "../../../core/services/dialog.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Extras} from "../../../core/interfaces/extras";
import {FaqComponent} from "../../../shared/faq/faq.component";
import {PriceList} from "../../../core/interfaces/prices/price-list";
import {PricesService} from "../../../core/services/prices.service";
const FAQ: Extras = {
  Headline: "FAQ",
  info: [
    {
      title: 'Placeholder question?',
      message: 'placeholder answer',
    },
  ]
}
@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFabButton,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatMiniFabButton,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatSuffix,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef,
    MatProgressSpinner,
    FaqComponent
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
/**
 * much of what is done here is done in newOrder component
 * meaning that it is better explained there
 */
export class EditOrderComponent {
  //form
  formEditOrder: FormGroup= new FormGroup({
    clientId: new FormControl('', [Validators.required]),
    orderDate: new FormControl('')
  })
  //services
  private orderService = inject(OrdersService)
  private tankService = inject(TankServiceService)
  private clientService = inject(ClientService)
  private priceListService = inject(PricesService)
  private router = inject(Router);
  private dialogService= inject(DialogService)
  private activatedRoute = inject(ActivatedRoute)
  //variables
  columnsToDisplay: string[] = ['product', 'quantity', 'price', 'action']
  detailList:OrderDetail[]=[]
  clientList: Client[]= [];
  typeTankList: TankType[]=[];
  priceLists:PriceList[]=[]
  currentDate:Date= new Date()
  currentOrder:Order = {
    clientId: 0, createdDate: "", id: 0, lastUpdatedAt: "", orderDate: "", orderDetails: [], state: "", totalPrice: 0
  }
  currentId:number=0
  dolar:number = 0
  isLoading:boolean=false
  //methods
  ngOnInit() {
    this.loadData()
    this.getOrderInfo()
  }

  private getOrderInfo() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id){
      this.currentId = id
      this.orderService.getById(this.currentId).subscribe({
        next: data => {
          this.currentOrder = data;
          this.formEditOrder.patchValue({
            clientId: this.currentOrder.clientId,
            orderDate: this.currentOrder.orderDate,
          })
          this.detailList = this.processedDetails(this.currentOrder.orderDetails)
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }

  editOrder() {
    if (this.formEditOrder.invalid || this.detailList.length < 1) {
      if (this.detailList.length < 1) {
        this.dialogService.alert('Error','Debe  tener por lo menos un tanque en la  orden').subscribe()
      }else alert("el formulario es invalido")
    } else{
      this.isLoading = true;
      this.currentOrder.clientId = this.formEditOrder.value.clientId;
      this.currentOrder.orderDate = this.formEditOrder.value.orderDate

      this.currentOrder.orderDetails = this.detailList

      if (typeof this.formEditOrder.value.orderDate==="object") {
        this.currentOrder.orderDate = this.toLocalDateTimeString(this.formEditOrder.value.orderDate)
      }

      this.orderService.putOrder(this.currentOrder).subscribe({
        next: data => {
          this.dialogService.alert('Exito','La orden fue actualizada correctamente')
          this.router.navigate(['/orders/all']);
          this.isLoading = false;
        },
        error: error => {
          console.error(error);
          this.isLoading = false;
        }
      })
    }
  }

  addTank(index: number) {
    let tankType: TankType = this.typeTankList[index];

    let check = this.detailList.find(dtl => dtl.typeTankId === tankType.id)
    if (check) {

      check.quantity = check.quantity + 1;

    } else {
      const newDetail: OrderDetail = {
        price: this.calculatePrice(tankType), //todo fix this, is not the cose
        quantity: 1,
        typeTankId: tankType.id
      }

      this.detailList = [...this.detailList, newDetail];
    }
  }

  reduceTank(detail:OrderDetail) {
    if (detail.quantity > 1) {
      detail.quantity--;
    } else {
      let index = this.detailList.indexOf(detail);
      this.detailList.splice(index, 1)
      this.detailList = [...this.detailList];
    }
  }

  leave() {
    this.router.navigate(['/orders/'+this.currentId]);
  }

  private loadData() {
    this.clientService.getClientList().subscribe(data => {
      this.clientList = data;
    })
    this.tankService.getAllTankTypes().subscribe(data => {
      this.typeTankList = data;
    })
    this.priceListService.getAllPrices().subscribe(data => {
      this.priceLists = data;
    })
    this.priceListService.getDolar().subscribe(data => {
      this.dolar = data.usdValue
    })
  }

  get totalPrice(): number {

    let total: number = 0

    for (let detailListElement of this.detailList) {
      total += detailListElement.price * detailListElement.quantity;
    }

    return total
  }

  toLocalDateTimeString(date: Date): string {
    return date.toISOString().slice(0, 19);
  }

  protected readonly FAQ = FAQ;

  private calculatePrice(tankType: TankType) {
    const clientId = this.formEditOrder.get('clientId')?.value;

    if (clientId){
      const client = this.clientList.find(c=>c.id === clientId);
      if (client){
        const priceList = this.priceLists.find(pl=> pl.id ===client.priceListId)
        if (priceList){
          let price = ((tankType.cost + priceList.profit) * priceList.commission) + (priceList.corralon * priceList.profit);
          if (priceList.volKm === "CIEN") {
            price = price + tankType.vol100
          } else if (priceList.volKm === "DOSCIENTOS") {
            price = price + tankType.vol200
          }
          price = +(price / this.dolar).toFixed(2)  //not necesary since it won't  be tied to the dolar
          return price
        }
      }
    }
    return 0;
  }

  getTankName(id: number) {
    const tanType = this.typeTankList.find(tt=>tt.id === id);
    return tanType ? tanType.type + " | " + tanType.cover + " | " + tanType.quantity : "Tipo de tanque borrado";
  }

  private processedDetails(orderDetails: OrderDetail[]) {
    const processedList:OrderDetail[] = []

    for (let detail of orderDetails) {
      let tankType = this.typeTankList.find(tt => tt.id === detail.typeTankId)
      if (tankType){
        const newDetail: OrderDetail = {
          typeTankId : detail.typeTankId,
          quantity: detail.quantity,
          price : this.calculatePrice(tankType),
        }
        processedList.push(newDetail)
      }
    }
    return processedList;
  }
}
