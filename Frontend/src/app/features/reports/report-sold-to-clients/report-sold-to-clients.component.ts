import {Component, inject} from '@angular/core';
import {OrdersService} from "../../../core/services/orders.service";
import {ClientService} from "../../../core/services/client.service";
import {Client} from "../../../core/interfaces/client/client";
import {Order} from "../../../core/interfaces/orders/order";
import {PieChartData} from "../../../core/interfaces/reports/pie-chart-data";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {OrderDetail} from "../../../core/interfaces/orders/order-detail";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {DialogService} from "../../../core/services/dialog.service";

@Component({
  selector: 'app-report-sold-to-clients',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    MatLabel,
    MatSuffix,
    MatButton,
    NgxChartsModule
  ],
  templateUrl: './report-sold-to-clients.component.html',
  styleUrl: './report-sold-to-clients.component.css'
})
export class ReportSoldToClientsComponent {
  //services
  private orderService = inject(OrdersService)
  private clientService = inject(ClientService)
  private tankService = inject(TankServiceService)
  private dialogService = inject(DialogService)

  //variables
  startDate: Date = new Date(new Date().getFullYear() -1, new Date().getMonth(), new Date().getDate());
  endDate: Date = new Date();

  clientSelectedId:number=0
  showReport:boolean = false;

  clientList:Client[]=[];
  orderList:Order[]=[];
  tankTypeList:TankType[]=[];


  charData:PieChartData[]=[]

  //methods
  ngOnInit() {
    this.loadClientsAndTanksTypes()
  }

  private loadClientsAndTanksTypes() {
    this.clientService.getClientList().subscribe({
      next: data => {
        this.clientList = data
      },
      error: err => {
        console.error(err)
      }
    })
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypeList = data
      },
      error: err => {
        console.error(err)
      }
    })
  }

  loadReport(){
    this.orderService.getOrdersreport(this.startDate, this.endDate).subscribe({
      next: data => {
        this.orderList = data

        // console.log(' this is whatt we recive ', data)

        this.updateChart()
      },
      error: err => {
        console.error(err)
      }
    })
  }

  private updateChart() {
    const clientOrders:Order[] = this.orderList.filter(order=> order.clientId===this.clientSelectedId)
    if (clientOrders.length === 0){
      this.dialogService.alert('Alerta','no hay datos para mostrar el resultado.')
    } else {
      this.showReport = true;


      const clientDetails:OrderDetail[] = []
      for (const order of clientOrders) {
        clientDetails.push(...order.orderDetails)
      }

      const countByTank = new Map<string,number>()
      for (const orderDetails of clientDetails) {
        const tankName = this.getTankName(orderDetails.typeTankId)

        countByTank.set(
          tankName,
          (countByTank.get(tankName)??0)+orderDetails.quantity
        )
      }

      const entryArray = Array.from(countByTank.entries())

      const transformed = entryArray.map(entry => {
        const name = entry[0]
        const value = entry[1]
        return {name, value}
      })

      this.charData = transformed
    }

  }

  private getTankName(id:number):string {
    const tankType = this.tankTypeList.find(t=>t.id === id)
    return tankType ? tankType.type+' '+tankType.cover+' '+ tankType.quantity+'Lts': 'Tanque Borrado'
  }

  colorScheme = {
    domain: ['#0288d1', '#ff7043', '#7cb342', '#ab47bc', '#fbc02d', '#8d6e63']
  };
}
