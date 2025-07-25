import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {PrimaryConsumable} from "../../../core/interfaces/consumable/primary-consumable";
import {ConsumablesService} from "../../../core/services/consumables.service";
import {MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {UpdateConsumable} from "../../../core/interfaces/consumable/update-consumable";
import {DialogService} from "../../../core/services/dialog.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDivider} from "@angular/material/divider";
import {Extras} from "../../../core/interfaces/extras";
import {FaqComponent} from "../../../shared/faq/faq.component";

const FAQ: Extras = {
  Headline: "FAQ",
  info: [
    {
      title: '¿Puedo agregar un nuevo insumo primario?',
      message: 'No. Los insumos primarios están calculados por tipo de tanque y su modificación requeriría una reestructuración del sistema. Es posible agregarlos si se contacta con el encargado del sistema, pero no es una acción disponible para el usuario común.',
    }, {
      title: 'Hice un tanque recién y me indicó que faltaban insumos, ¿qué pasó?',
      message: 'Lo más probable es que el administrador haya olvidado cargar alguno de los insumos. De lo contrario, el sistema no habría permitido crear el tanque. Contacte al administrador para que complete la carga de los insumos faltantes.',
    }
  ]
}

@Component({
  selector: 'app-primary-consumables',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatMiniFabButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatInput,
    MatFormField,
    MatLabel,
    MatCheckbox,
    FormsModule,
    MatProgressSpinner,
    MatDivider,
    FaqComponent
  ],
  templateUrl: './primary-consumables.component.html',
  styleUrl: './primary-consumables.component.css'
})
export class PrimaryConsumablesComponent {

  //service
  private consumableService = inject(ConsumablesService)
  private dialogService = inject(DialogService);
  //variables
  consumablesList: PrimaryConsumable[] = []
  columnsToDisplay: string[] = ['nombre', 'subtype', 'stock', 'agregar']
  overwrite: boolean = false;
  isLoading: boolean = false;

  //this is for the value neeeded to increse or decrese the stock of the primary consumables
  inputValues: { [id: number]: number } = {}

  //methods
  ngOnInit() {
    this.loadConsumables()
  }

  private loadConsumables() {
    this.consumableService.getAllPrimaryConsumables().subscribe({
      next: data => {
        this.consumablesList = data
      },
      error: error => {
        console.log(error)
      }
    })
  }


  add(id: number) {
    //se extrae el valor del campo en la fila de la tabla
    const addValue = this.inputValues[id]
    if (isNaN(addValue)) {//si el valor resulta no ser un numero salta error
      this.dialogService.alert('Error', 'El valor ingresado no es un numero').subscribe()

      this.inputValues[id] = 0
      return;
    }
    this.isLoading = true

    //se encuentra el insumo a modificar
    const consumableToUpdatee = this.consumablesList.find(consumable => consumable.id === id)

    if (!consumableToUpdatee) {
      return;
    }

    let update: UpdateConsumable = {//se genera el dto para madandar al backend
      consumableId: consumableToUpdatee.id,
      quantity: consumableToUpdatee.quantity + addValue
    }
    if (this.overwrite) {
      update.quantity = addValue
    }

    this.consumableService.putPrimaryConsumable(update).subscribe({
      next: data => {
        this.inputValues[id] = 0
        this.loadConsumables()
        this.isLoading = false
      },
      error: error => {
        console.error('there was an error sending the information', error)
        this.isLoading = false
      }
    })

  }

  protected readonly FAQ = FAQ;
}
