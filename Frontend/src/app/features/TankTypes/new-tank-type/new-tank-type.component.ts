import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DialogService} from "../../../core/services/dialog.service";
import {routes} from "../../../app.routes";
import {MatDivider} from "@angular/material/divider";
import {FaqComponent} from "../../../shared/faq/faq.component";
import {Extras} from "../../../core/interfaces/extras";

const FAQ: Extras = {
  Headline: "FAQ",
  info: [
    {
      title: 'Vol100 que significa?',
      message: 'vol100 se refiere     al recargo monetario que se  le asigna al    tanque  por    trasladarlo hasta 100km',
    },
    {
      title: 'que es capas?',
      message: 'se refiere a las capas que componen el tanque, si esta  hecho con    una, dos    o tres    capas',
    },
  ]
}

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
    MatHint,
    MatDivider,
    FaqComponent
  ],
  templateUrl: './new-tank-type.component.html',
  styleUrl: './new-tank-type.component.css'
})
export class NewTankTypeComponent {
  //form
  tankTypeForm: FormGroup = new FormGroup({
    type: new FormControl("", [Validators.required]),
    cover: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.min(0)]),
    plasticBlack: new FormControl('', [Validators.required, Validators.min(0)]),
    plasticColor: new FormControl('', [Validators.required, Validators.min(0)]),
    cost: new FormControl('', [Validators.required, Validators.min(0)]),
    screws: new FormControl(0, [Validators.min(0)]),
    coverType: new FormControl("NONE", [Validators.required]),
    stock1: new FormControl('', [Validators.min(0), Validators.required]),
    stock2: new FormControl('', [Validators.min(0), Validators.required]),
    bigScrews: new FormControl(0),
    tee: new FormControl(false),
    sticker: new FormControl("NONE"),
    vol100: new FormControl('', [Validators.required]),
    vol200: new FormControl('', [Validators.required]),

    showSticker: new FormControl(false),
    showBigScrews: new FormControl(false),
  })

  //service
  tankService = inject(TankServiceService)
  dialogService = inject(DialogService)
  router = inject(Router);

  //variables
  isLoading = false

  //methods
  onSubmit() {
    if (this.tankTypeForm.valid) {

      this.isLoading = true

      const formTankType = this.tankTypeForm.value

      const tankType: TankType = {
        ...formTankType,
        sticker: formTankType.showSticker ? formTankType.sticker : "NONE",
        bigScrews: formTankType.showBigScrews ? formTankType.bigScrews : 0,
      }

      delete (tankType as any).showSticker
      delete (tankType as any).showBigScrews

      console.log('enviando datos al backend', tankType);

      this.tankService.postTankType(tankType).subscribe({
        next: (response) => {
          console.log('guardado exitosamente', response);

          this.dialogService.confirm('¡Guardado exitosamente!', '¿Deseás cargar otro tipo de tanque?').subscribe(
            ok => {
              if (ok) {
                this.tankTypeForm.reset({
                  type: '',
                  cover: tankType.cover,
                  quantity: 0,
                  plasticBlack: 0,
                  plasticColor: 0,
                  cost: 0,
                  screws: 0,
                  coverType: 'NONE',
                  stock1: 0,
                  stock2: 0,
                  bigScrews: 0,
                  tee: false,
                  sticker: 'NONE',
                  vol100: 0,
                  vol200: 0,
                  showSticker: false,
                  showBigScrews: false
                });
                this.tankTypeForm.markAsPristine()
                this.tankTypeForm.markAsUntouched()
                this.tankTypeForm.updateValueAndValidity()
              } else {
                this.router.navigate(['/tanktypes'])
              }
            }
          )

          this.isLoading = false;
        },
        error: (error) => {
          console.error('error al guardar ', error);
          alert('error al guardar en el backend')
          this.isLoading = false;
        }
      })
    } else {
      alert('this form is invalid');
      this.isLoading = false;
      this.tankTypeForm.markAsTouched()
    }
  }

  protected readonly FAQ = FAQ;
}
