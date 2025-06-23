import {Component, inject, ViewChild} from '@angular/core';
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
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {DialogService} from "../../../core/services/dialog.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDivider} from "@angular/material/divider";

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
    MatMiniFabButton,
    MatProgressSpinner,
    MatSort,
    MatSortHeader,
    MatDivider
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
    direction: new FormControl("", Validators.required),
  })
  //service
  private priceListService = inject(PricesService)
  private clientService = inject(ClientService)
  private dialogService = inject(DialogService)
  //variables
  priceList: PriceList[] = []
  columnsToDisplay: string[] = ['name', 'telephone', 'direction', 'priceListId', 'Accion']
  isUpdating: boolean = false;
  currentEditingId: number = 0;

  isLoading:boolean=false;

  dataSource = new MatTableDataSource<Client>([]);



  //methods
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

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
        // this.clientList = data
        this.dataSource.data = data
      },
      error: err => {
        console.log(err)
      }
    })
  }


  save() {
    if (this.clientForm.invalid) {
      alert(' this form is invalid')
    } else {
      this.isLoading = true;

      if (this.isUpdating) {

        const client: Client = {
          id: this.currentEditingId,
          ...this.clientForm.value
        }
        this.clientService.putClient(client).subscribe({
          next: data => {
            console.log('update client')

            this.loadClientList()
            this.isUpdating = false
            this.clientForm.reset()
            this.clientForm.markAsPristine()
            this.clientForm.markAsUntouched()
            this.isLoading = false
          },
          error: err => {
            console.log('hubo un error actualizando ', err)
            this.isLoading = false
          }
        })
      } else {
        const client: Client = {
          ...this.clientForm.value,
        }

        this.clientService.postClient(client).subscribe({
          next: data => {
            this.loadClientList()

            this.clientForm.reset()
            this.clientForm.markAsPristine()
            this.clientForm.markAsUntouched()
            this.isLoading = false
          },
          error: err => {
            console.log('hubo un error creando la entidad ', err)
            this.isLoading = false
          }
        })
      }
    }
  }

  delete(id: number) {
    this.dialogService.confirm('Borrar Cliente', 'esta seguro que desea borrar el cliente permanentemente?')
      .subscribe(ok => {
        if (ok) {
          this.clientService.deleteClient(id).subscribe({
            next: data => {
              this.dialogService.alert('Exito', 'Cliente borrado exitosamente').subscribe()
              this.loadClientList()
            },
            error: err => {
              console.log(err)
            }
          })
        }
      })

  }

  edit(id: number) {
    const clientFilter = this.dataSource.data.find(c => c.id === id);
    if (clientFilter) {
      this.isUpdating = true

      this.clientForm.patchValue({
        name: clientFilter.name,
        telephone: clientFilter.telephone,
        priceListId: clientFilter.priceListId,
        direction: clientFilter.direction,
      })
      this.currentEditingId = id
    }

  }

  cancelEditing() {
    this.isUpdating = false
    this.clientForm.reset()
  }


  getPriceListName(priceListId: number): string {
    const priceList = this.priceList.find(pl => pl.id === priceListId)
    if (priceList) {
      return priceList.name
    } else {
      return 'error'
    }
  }
}
