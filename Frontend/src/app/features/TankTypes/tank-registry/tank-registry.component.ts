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
import {DialogService} from "../../../core/services/dialog.service";
import {AuthService} from "../../../core/services/auth.service";

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
  private dialogService = inject(DialogService)
  private authService = inject(AuthService)

  //variables
  tankTypeList: TankType[] = []
  userId: number = 0


  //methods
  ngOnInit() {
    this.loadTankTypes()
    let authId = this.authService.currentUser()()?.id
    if (authId) {
      this.userId = authId
    }
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

          this.dialogService.alert('Exito','Tanque Registrado!').subscribe()

          // Si llegó aquí, es un Tank creado con éxito
          console.log('tankque creado con exito')
        },
        error: err => {
          if (err.status === 409 && Array.isArray(err.error)) {
            const missing: MissingConsumable[] = err.error;
            //todo: make a dialog specific about this table of missing consumables 4 colums
            alert('faltan insumos: ')
            console.table(missing)

            this.dialogService.confirm('Registrar igual','¿Deseas forzar el registro del tanque de todas formas?')
              .subscribe(ok=>{
                if (ok){
                  this.tankService.postTank(newTank, true).subscribe({
                    next: ()=>{
                      this.dialogService.alert('Tanque registrado Forzosamente','Avisar al Administrador del estado del inventario').subscribe()
                    },
                    error: err => {
                      console.error(err)
                    }
                  })
                } else {
                  this.FormTankForm.reset();
                }
              })
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

/*
 * todo:
 *  informes, vendido por tipo, ranking por cliente
 */
