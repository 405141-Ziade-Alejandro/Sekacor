import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

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
    FormsModule
  ],
  templateUrl: './new-tank-type.component.html',
  styleUrl: './new-tank-type.component.css'
})
export class NewTankTypeComponent {
  //service
  //variables
  showRamal:boolean=false;
  showORings:boolean=false;
  showSticker:boolean=false;
  showBigScrews:boolean=false;
  //methods
}
