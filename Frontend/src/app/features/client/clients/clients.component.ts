import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {PriceList} from "../../../core/interfaces/prices/price-list";
import {PricesService} from "../../../core/services/prices.service";
import {ClientService} from "../../../core/services/client.service";
import {Client} from "../../../core/interfaces/client/client";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
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
    MatMiniFabButton
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  //form
  clientForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required),
    priceListId: new FormControl("", Validators.required),
  })
  //service
  private priceListService = inject(PricesService)
  private clientService = inject(ClientService)
  //variables
  priceList: PriceList[] = []
  clientList: Client[] = []
  columnsToDisplay: string[] = ['Nombre', 'Telefono', 'Lista de Precio', 'Accion']
  isUpdating: boolean = false;
  currentEditingId: number = 0;

  //methods
  ngOnInit() {
    this.loadClientList()
    this.priceListService.getAllPrices().subscribe({
      next: data => {
        this.priceList = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private loadClientList() {
    this.clientService.getClientList().subscribe({
      next: data => {
        this.clientList = data
      },
      error: err => {
        console.log(err)
      }
    })
  }


  save() {
    console.log(this.clientForm)
    if (this.clientForm.invalid) {
      console.error(' this form is invalid')
    } else {

      if (this.isUpdating){

        const client: Client = {
          id: this.currentEditingId,
          ...this.clientForm.value
        }

        console.log('enviando datos al backendt', client)

        this.clientService.putClient(client).subscribe({
          next: data => {
            console.log('update client')

            this.loadClientList()
            this.isUpdating = false
            this.clientForm.reset()
            this.clientForm.markAsPristine()
            this.clientForm.markAsUntouched()
          },
          error: err => {
            console.log('hubo un error actualizando ',err)
          }
        })
      }else {
        const client: Client = {
          ...this.clientForm.value,
        }
        console.log('enviando datos al backendt', client)

        this.clientService.postClient(client).subscribe({
          next: data => {
            console.log('guardado exitosamente')

            this.loadClientList()

            this.clientForm.reset()
            this.clientForm.markAsPristine()
            this.clientForm.markAsUntouched()
          },
          error: err => {
            console.log('hubo un error creando la entidad ',err)
          }
        })
      }
    }
  }

  delete(id: number) {
    this.clientService.deleteClient(id).subscribe({
      next: data => {
        console.log('Borrado exitosamente')
        this.loadClientList()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  edit(id: number) {
    const clientFilter = this.clientList.find(c => c.id === id);
    if (clientFilter) {
      this.isUpdating = true

      this.clientForm.patchValue({
        name: clientFilter.name,
        telephone: clientFilter.telephone,
        priceListId: clientFilter.priceListId,
      })
      this.currentEditingId= id
    }

  }

  cancelEditing() {
    this.isUpdating = false
    this.clientForm.reset()
  }


  getPriceListName(priceListId: number):string {
    const priceList = this.priceList.find(pl=>pl.id===priceListId)
    if (priceList) {
      return priceList.name
    } else {
      return 'error'
    }
  }
}
