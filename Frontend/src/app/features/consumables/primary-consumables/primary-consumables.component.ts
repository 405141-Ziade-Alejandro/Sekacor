import {Component, inject} from '@angular/core';
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
import {PrimaryConsumable} from "../../../core/interfaces/consumable/primary-consumable";
import {ConsumablesService} from "../../../core/services/consumables.service";
import {MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {UpdateConsumable} from "../../../core/interfaces/consumable/update-consumable";

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
    MatLabel
  ],
  templateUrl: './primary-consumables.component.html',
  styleUrl: './primary-consumables.component.css'
})
export class PrimaryConsumablesComponent {

  //service
  private consumableService = inject(ConsumablesService)
  //variables
  consumablesList:PrimaryConsumable[] =[]
  columnsToDisplay:string[] = ['nombre','subtype','stock','agregar']

  inputValues:{[id:number]:number} = {}

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


  add(id:number) {
    const addValue = this.inputValues[id]
    if (isNaN(addValue)) {
      console.warn(addValue + " is not a number")
      this.inputValues[id] = 0
      return;
    }
    const consumableToUpdatee = this.consumablesList.find(consumable => consumable.id === id)

    if (!consumableToUpdatee) {
      return;
    }

    let update:UpdateConsumable = {
      consumableId: consumableToUpdatee.id,
      quantity: consumableToUpdatee.quantity + addValue

    }

    this.consumableService.putPrimaryConsumable(update).subscribe({
      next: data => {
        console.log('consumable updated', data);
        this.inputValues[id] = 0
        this.loadConsumables()
      },
      error: error => {
        console.error('there was an error sending the information', error)
      }
    })

  }
}
