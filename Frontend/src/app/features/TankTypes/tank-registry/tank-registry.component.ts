import {Component, inject} from '@angular/core';
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MissingConsumable} from "../../../core/interfaces/tanks/missing-consumable";

@Component({
  selector: 'app-tank-registry',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatFabButton,
    MatIcon,
    MatCardHeader,
    MatSelect,
    MatOption,
    MatCardFooter,
    MatRadioGroup,
    MatRadioButton,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './tank-registry.component.html',
  styleUrl: './tank-registry.component.css'
})
export class TankRegistryComponent {
  //form
  FormTankForm: FormGroup = new FormGroup({
    typeId: new FormControl('', [Validators.required]),
    quality: new FormControl('', [Validators.required])
  })

  //service
  private tankService = inject(TankServiceService)

  //variables
  tankTypeList: TankType[] = []
  userId: number = 1 //todo: remplazar esto con la forma correcta de recivir el id del usuario


  //methods
  ngOnInit() {
    this.loadTankTypes()
  }

  private loadTankTypes() {
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypeList = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  newTank() {
    if (this.FormTankForm.valid) {
      const newTank = {
        userId: this.userId,
        ...this.FormTankForm.value
      }

      this.tankService.postTank(newTank, false).subscribe({
        next: data => {

          // Si llegó aquí, es un Tank creado con éxito
          console.log('tankque creado con exito')
        },
        error: err => {
          if (err.status === 409 && Array.isArray(err.error)) {
            const missing: MissingConsumable[] = err.error;
            alert('faltan insumos: ')
            console.table(missing)

            if (confirm('¿Deseas forzar la creación del tanque de todas formas?')) {
              this.tankService.postTank(newTank, true).subscribe({
                next: data => {
                  alert('tanque creado a la fuerza')
                  console.warn('revisar inventario manualmente')
                }
              })
            } else {
              this.FormTankForm.reset()
            }
          } else {
            console.error('error inesperado', err)
          }
        }
      })

    } else {
      console.error('Form not valid')
    }
  }
}
