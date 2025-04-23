import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {TankType} from "../../../core/interfaces/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-new-tank-type',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatSuffix,
    MatPrefix,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    MatHint
  ],
  templateUrl: './new-tank-type.component.html',
  styleUrl: './new-tank-type.component.css'
})
export class NewTankTypeComponent {
  //form
  tankTypeForm: FormGroup = new FormGroup({
    type: new FormControl("", [Validators.required]),
    cover:new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.min(0)]),
    plasticBlack: new FormControl('', [Validators.required,Validators.min(0)]),
    plasticColor: new FormControl('', [Validators.required,Validators.min(0)]),
    cost: new FormControl('', [Validators.required,Validators.min(0)]),
    screws: new FormControl(0, [Validators.min(0)]),
    coverType: new FormControl("NONE", [Validators.required]),
    stock1: new FormControl('',[Validators.min(0),Validators.required]),
    stock2: new FormControl('',[Validators.min(0),Validators.required]),
    bigScrews:new FormControl(0),
    tee: new FormControl(false),
    sticker: new FormControl(""),
    ramal: new FormControl(''),
    oring: new FormControl('')
  })
  //service
  tankService= inject(TankServiceService)
  router =inject(Router);
  dialogue = inject(MatDialog)
  //variables
  showRamal:boolean=false;
  showORings:boolean=false;
  showSticker:boolean=false;
  showBigScrews:boolean=false;
  isLoading = false
  //methods
  onSubmit() {
    if (this.tankTypeForm.valid) {
      // console.log('datos del form: ',this.tankTypeForm.value);

      this.isLoading =true

      const formTankType = this.tankTypeForm.value

      const tankType:TankType= {
        ...formTankType,
      }

      //this is necesary because the backend doesn't let you add empty strings as valid
      if (!this.showORings) {
        tankType.oring="NONE"
      }
      if (!this.showSticker) {
        tankType.sticker="NONE"
      }
      if (!this.showRamal) {
        tankType.ramal="NONE"
      }

      console.log('enviando datos al backend',tankType);

      this.tankService.postTankType(tankType).subscribe({
        next: (response) => {
          console.log('guardado exitosamente', response);

          this.dialogue.open(ConfirmDialogComponent, {
            data: {
              title:'¡Guardado exitosamente!',
              message:'¿Deseás cargar otro tipo de tanque?',
            }
          }).afterClosed().subscribe((confirm:boolean) => {
            if (confirm) {
              this.tankTypeForm.reset();
              this.tankTypeForm.patchValue({
                tee:false,
                coverType:"NONE"
              })

              this.resetExtraFlags()

              this.tankTypeForm.untouched

            } else {
              this.router.navigate(['/tanktypes']);
            }
          })

          this.isLoading = false;
        },
        error: (error) => {
          console.error('error al guardar ', error);
          alert('error al guardar en el backend')
        }
      })
    } else {
      alert('this form is invalid');
      this.isLoading = false;
      this.tankTypeForm.markAsTouched()
    }
  }

  resetExtraFlags() {
    this.showBigScrews = false;
    this.showSticker = false;
    this.showORings = false;
    this.showRamal = false;
  }
}
