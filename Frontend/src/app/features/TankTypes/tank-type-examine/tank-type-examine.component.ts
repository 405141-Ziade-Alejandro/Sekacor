import {Component, inject} from '@angular/core';
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {NewTankType} from "../../../core/interfaces/tanks/new-tank-type";
import {DialogService} from "../../../core/services/dialog.service";
import {MatDivider} from "@angular/material/divider";
import {FaqComponent} from "../../../shared/faq/faq.component";
import {Extras} from "../../../core/interfaces/extras";
import {MatDialog} from "@angular/material/dialog";
import {ExamineTankDialogComponent} from "../examine-tank-dialog/examine-tank-dialog.component";
import {MatCard, MatCardHeader} from "@angular/material/card";
const FAQ:Extras = {
  Headline: "FAQ",
  info: [
    {title:'¿Vol100 que significa?',message:'vol100 se refiere     al recargo monetario que se  le asigna al    tanque  por    trasladarlo hasta 100km',},
    {title:'¿que es capas?',message:'se refiere a las capas que componen el tanque, si esta  hecho con    una, dos    o tres    capas',},
  ]

}
@Component({
  selector: 'app-tank-type-examine',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCheckbox,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatProgressSpinner,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatDivider,
    FaqComponent,
    MatCard,
    MatCardHeader,
  ],
  templateUrl: './tank-type-examine.component.html',
  styleUrl: './tank-type-examine.component.css'
})
export class TankTypeExamineComponent {
  //services
  private tankService = inject(TankServiceService)
  private router: Router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private dialogService = inject(DialogService)
  //variables
  tankType: TankType | undefined
  updating: boolean = false;

  private id: number = 0;


  //methods

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getTank(this.id)
    }
  }

  private getTank(id: number) {
    this.tankService.getTankType(id).subscribe({
      next: (response) => {
        this.tankType = response;

        this.checkFlags()
      },
      error: (error) => {
        console.log('error: ', error);
      }
    })
  }

  back() {
    this.router.navigate(['/tanktypes']);
  }


// update

  showSticker: boolean = false;
  showBigScrews: boolean = false;
  isLoading = false


  checkFlags() {
    if (this.tankType) {
      if (this.tankType.bigScrews > 0) {
        this.showBigScrews = true;
      }
      if (this.tankType.sticker !== "NONE") {
        this.showSticker = true;
      }
    }
  }

  resetExtraFlags() {
    this.showBigScrews = false;
    this.showSticker = false;
  }

  save() {
    //this is necesary because the backend doesn't let you add empty strings as valid
    if (this.tankType) {
      this.isLoading = true;
      if (!this.showSticker) {
        this.tankType.sticker = "NONE"
      }
      if (!this.showBigScrews) {
        this.tankType.bigScrews = 0
      }

      const newTank: NewTankType = this.toNewTankType(this.tankType)

      this.dialogService.confirm('Guardar Tanque', 'Esta accion es Permanente, los datos anteriores se perderan')
        .subscribe(ok => {
          this.isLoading = false;
          if (ok) {
            if (this.tankType) {
              this.tankService.putTankType(this.tankType.id, newTank).subscribe({
                next: (response) => {
                  this.dialogService.alert('Exito', 'El tanque se actualizo correctamente')
                  this.router.navigate(['/tanktypes']);
                },
                error: (error) => {
                  console.log(error);
                }
              })
            }
          }
        })
    }
  }

  toNewTankType(tank: TankType): NewTankType {
    const {id, createdDate, lastUpdatedAt, ...newTank} = tank;
    return newTank;
  }



  protected readonly FAQ = FAQ;


}
