import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {CreatePriceDialogComponent} from "../create-price-dialog/create-price-dialog.component";
import {PricesService} from "../../../core/services/prices.service";
import {PriceList} from "../../../core/interfaces/prices/price-list";
import {DialogService} from "../../../core/services/dialog.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-prices-list',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatCardContent,
    MatTable,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatHeaderCellDef,
    FormsModule
  ],
  templateUrl: './prices-list.component.html',
  styleUrl: './prices-list.component.css'
})
export class PricesListComponent {
  //services
  private TankTypeService = inject(TankServiceService)
  private pricesService = inject(PricesService)
  private dialog = inject(MatDialog);
  private dialogService = inject(DialogService)
  //variables
  priceList: PriceList[] = []

  tankList: TankType[] = []
  dolar: number = 0

  columnsToDisplay: string[] = ['Tipo de Tanque', 'Costo', 'Precio', 'recargo'];

  priceListSelected: PriceList = {
    id: 0,
    name: '',
    profit: 0,
    commission: 0,
    corralon: 0,
    volKm: ''
  }

  somethingSelected: boolean = false

  //methods

  ngOnInit() {
    this.TankTypeService.getAllTankTypes().subscribe({
      next: data => {
        this.tankList = data;
      },
      error: err => {
        console.error('error fetching tank type list', err);
      }
    })

    this.loadPrices()
  }

  private loadPrices() {
    this.pricesService.getAllPrices().subscribe({
      next: data => {
        this.priceList = data
      },
      error: err => {
        console.error('error fetching prices list', err);
      }
    })
    this.pricesService.getDolar().subscribe({
      next: data => {
        this.dolar = data.usdValue
      },
      error: err => {
        console.error('error fetching dolar to dolar', err);
      }
    })
  }

  openCreateDialog() {
    this.dialog.open(CreatePriceDialogComponent, {
      width: '90vw',
      maxWidth: '900px',
      autoFocus: false,
    }).afterClosed().subscribe(id => {
      if (id) {
        console.log(id)//
        this.pricesService.getAllPrices().subscribe({
          next: data => {
            this.priceList = data
            const priceListCreated = this.priceList.find(item => item.id === id)
            console.log(priceListCreated)
            if (priceListCreated) {
              this.priceListSelected = priceListCreated
            }
          },
          error: err => {
            console.error('error fetching prices list', err);
          }
        })
      }
    })
  }

  changeSelection(index: number) {
    this.priceListSelected = this.priceList[index];
    this.somethingSelected = true
  }

  delete() {
    if (this.priceListSelected) {
      this.dialogService.confirm('Borrar Lista', 'Esta accion borrara la lista seleccionada, esta seguro que quiere hacerlo?')
        .subscribe(ok => {
          if (ok) {
            this.pricesService.delete(this.priceListSelected.id).subscribe({
              next: () => {
                this.dialogService.alert('Lista Borrada', 'La Lista fue borrada con excito')
                this.loadPrices()
              },
              error: err => {
                console.error('error  borrar lista', err);
              }
            })
          }
        })
    }
  }

  calculatePrice(tank: TankType) {
    let price = ((tank.cost + this.priceListSelected.profit) * this.priceListSelected.commission) + (this.priceListSelected.corralon * this.priceListSelected.profit);
    if (this.priceListSelected.volKm === "CIEN") {
      price = price + tank.vol100
    } else if (this.priceListSelected.volKm === "DOSCIENTOS") {
      price = price + tank.vol200
    }
    price = +(price / this.dolar).toFixed(2)

    return price;
  }

  calculateCommision() {
    const commision = this.priceListSelected.corralon * this.priceListSelected.profit
    return commision;
  }

  examine() {
    let message = "[(Costo del tanque + ganancia: $" + this.priceListSelected.profit + ") * comission: " + this.priceListSelected.commission + " + (Recargo corralon: " + this.priceListSelected.corralon + " *  ganancia: $" + this.priceListSelected.profit + ")]"
    if (this.priceListSelected.volKm === "CIEN" || this.priceListSelected.volKm === "DOSCIENTOS") {
      message += " * Vol cargo de volumen del tanque"
    }
    this.dialogService.alert("composicion de la lista de precios: " + this.priceListSelected.name, message)
  }
}
