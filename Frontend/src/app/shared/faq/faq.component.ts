import {Component, inject, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Extras} from "../../core/interfaces/extras";
import {MatDialog} from "@angular/material/dialog";
import {ExtraDialogComponent} from "../extra-dialog/extra-dialog.component";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  //variables
  @Input() faq!: Extras;
  //services
  private   dialog = inject(MatDialog)
  //methods
  openFaq() {
    this.dialog.open(ExtraDialogComponent, {
      data: this.faq
    })
  }
}
