import {Component, inject} from '@angular/core';
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatList, MatListItem} from "@angular/material/list";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDialog} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {NewTankType} from "../../../core/interfaces/tanks/new-tank-type";

@Component({
  selector: 'app-tank-type-examine',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatToolbar,
    MatIcon,
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
  ],
  templateUrl: './tank-type-examine.component.html',
  styleUrl: './tank-type-examine.component.css'
})
export class TankTypeExamineComponent {
  //services
  tankService = inject(TankServiceService)
  private router: Router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  //variables
  tankType: TankType | undefined
  updating: boolean = false;

  private id:number=0;
  //methods

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getTank(this.id)
    }
    this.updating = this.tankService.getUpdate()
  }

  private getTank(id: number) {
    this.tankService.getTankType(id).subscribe({
      next: (response) => {
        this.tankType = response;
        console.log('datos del tanque: ', this.tankType);
        this.checkFlags()
      },
      error: (error) => {
        console.log('error: ', error);
      }
    })
  }

  back() {
    this.tankService.setUpdating(false)
    this.router.navigate(['/tanktypes']);
  }

  switch() {
    this.updating = !this.updating;

    this.tankService.setUpdating(!this.tankService.getUpdate())
  }


// update
  dialogue = inject(MatDialog)


  showRamal:boolean=false;
  showORings:boolean=false;
  showSticker:boolean=false;
  showBigScrews:boolean=false;
  isLoading = false


  checkFlags() {
    if(this.tankType){
      if (this.tankType.bigScrews>0) {
        this.showBigScrews = true;
      }
      if (this.tankType.sticker!=="NONE"){
        this.showSticker = true;
      }
      if (this.tankType.oring!=="NONE"){
        this.showORings = true;
      }
      if (this.tankType.ramal!=="NONE"){
        this.showRamal = true;
      }
    }
  }

  resetExtraFlags() {
    this.showBigScrews = false;
    this.showSticker = false;
    this.showORings = false;
    this.showRamal = false;
  }

  save() {
    //this is necesary because the backend doesn't let you add empty strings as valid
    if (this.tankType){
      if (!this.showORings) {
        this.tankType.oring="NONE"
      }
      if (!this.showSticker) {
        this.tankType.sticker="NONE"
      }
      if (!this.showRamal) {
        this.tankType.ramal="NONE"
      }
      if (!this.showBigScrews){
        this.tankType.bigScrews=0
      }

      const newTank:NewTankType = this.toNewTankType(this.tankType)

      this.dialogue.open(ConfirmDialogComponent, {
        data: {
          title:'Guardar Tanque?',
          message:'esta accion es permanente, los datos anteriores se perederan'
        }
      }).afterClosed().subscribe((confirm:boolean) => {
        if (confirm) {
          //save
          if (this.tankType){
            this.tankService.putTankType(this.tankType.id,newTank).subscribe({
              next: (response) => {
                alert('tank saved!')
                console.log(response)
                this.tankService.setUpdating(false);
                this.router.navigate(['/tanktypes']);
              },
              error: (error) => {
                console.log('tank', newTank)
                console.log('error: ', error);
              }
            })
          }

        } else {
          this.resetExtraFlags()
          this.getTank(this.id)
        }

      })

      console.log(this.tankType);
    }
  }

  toNewTankType(tank: TankType): NewTankType {
    const { id, createdDate, lastUpdatedAt, ...newTank } = tank;
    return newTank;
  }
}
