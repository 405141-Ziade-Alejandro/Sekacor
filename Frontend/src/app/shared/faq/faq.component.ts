import {Component, inject, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Extras} from "../../core/interfaces/extras";
import {MatDialog} from "@angular/material/dialog";
import {ExtraDialogComponent} from "../extra-dialog/extra-dialog.component";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton
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
