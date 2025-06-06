import {Component, inject} from '@angular/core';
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
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {SecondaryConsumable} from "../../../core/interfaces/consumable/secondary-consumable";
import {ConsumablesService} from "../../../core/services/consumables.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {UpdateConsumable} from "../../../core/interfaces/consumable/update-consumable";
import {DialogService} from "../../../core/services/dialog.service";

@Component({
  selector: 'app-secundary-consumables',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatMiniFabButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatToolbar,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './secundary-consumables.component.html',
  styleUrl: './secundary-consumables.component.css'
})
export class SecundaryConsumablesComponent {
  //form
  ConsumableForm: FormGroup = new FormGroup({
    type: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.min(0)]),
    unit: new FormControl("", [Validators.required]),
    subType: new FormControl(""),
  })

  //services
  consumableService = inject(ConsumablesService)
  dialogService = inject(DialogService)

  //variables
  consumablesList: SecondaryConsumable[] = [];
  columnsToDisplay: string[] = ['name', 'subtype', 'stock', 'add']

  inputValues: { [id: number]: number } = {}

  //methods
  ngOnInit(): void {
    this.loadConsumables()
  }

  private loadConsumables() {
    this.consumableService.getAllSecondaryConsumables().subscribe({
      next: data => {
        this.consumablesList = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  save() {
    if (this.ConsumableForm.invalid) {
      console.error("this form is invalid");
    } else {
      const consumable: SecondaryConsumable = {
        ...this.ConsumableForm.value,
      }
      if (consumable.subType === "") {
        consumable.subType = "-";
      }
      this.consumableService.postSecondaryConsumable(consumable).subscribe({
        next: data => {
          this.ConsumableForm.reset();
          this.ConsumableForm.markAsPristine()

          this.loadConsumables()
        },
        error: err => {
          console.error('something went wrong sending the data to the backend', err)
        }
      })
    }
  }

  /**
   * mirar el add de primary consumables, es casi igual y esta mas detallado ahi
   */
  add(id: number) {

    const addedValue = this.inputValues[id]
    if (typeof addedValue !== 'number' || isNaN(addedValue)) {
      this.inputValues[id] = 0;
      return;
    }
    const consumableToUpdate = this.consumablesList.find(consumable => consumable.id === id)

    if (!consumableToUpdate) return;

    let update: UpdateConsumable = {
      consumableId: consumableToUpdate.id,
      quantity: consumableToUpdate.quantity + addedValue
    }

    this.consumableService.putSecondaryConsumable(update).subscribe({
      next: data => {
        this.inputValues[id] = 0
        this.loadConsumables()
      },
      error: err => {
        console.error('something went wrong sending the data to the backend', err)
      }
    })

  }

  delete(id: number) {
    this.dialogService.confirm('Confirmar Borrado','Esta Accion borrara el insumo, desea continuar?')
      .subscribe(ok=> {
        if (ok){
          this.consumableService.deleteSecondaryConsumable(id).subscribe({
            next: data => {
              this.loadConsumables()
            },
            error: err => {
              console.error('something went wrong sending the data to the backend', err)
            }
          })
        }
      })
  }
}
