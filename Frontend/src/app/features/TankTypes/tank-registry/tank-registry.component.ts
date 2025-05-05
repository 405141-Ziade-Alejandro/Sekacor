import {Component, inject} from '@angular/core';
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  FormTankForm: FormGroup=new FormGroup({
    tankType: new FormControl('', [Validators.required]),
    quality: new FormControl('', [Validators.required])
  })

  //service
  private tankService = inject(TankServiceService)

  //variables
  tankTypeList: TankType[]=[]

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

  }
}
