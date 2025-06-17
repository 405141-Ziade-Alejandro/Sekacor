import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PricesService} from "../../../core/services/prices.service";
import {PriceList} from "../../../core/interfaces/prices/price-list";
import {Router} from "@angular/router";
import {DialogService} from "../../../core/services/dialog.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-create-price-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './create-price-dialog.component.html',
  styleUrl: './create-price-dialog.component.css'
})
export class CreatePriceDialogComponent {
  private dialogRef = inject(MatDialogRef<CreatePriceDialogComponent>)
  //form
  formPriceList:FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    profit: new FormControl('', Validators.required),
    commission: new FormControl('', Validators.required),
    corralon: new FormControl('', Validators.required),
    volKm: new FormControl('ZERO', Validators.required),
  })
  //services
  priceListService=inject(PricesService)
  router = inject(Router)
  dialogService =  inject(DialogService)
  //variables
  isLoading:boolean = false;
  //methods
  close() {
    this.dialogRef.close();
  }


  get Km():boolean{
    const vol:string = this.formPriceList.controls['volKm'].value;

    if (vol == "ZERO"){
      return false;
    }
    return true;
  }

  submit() {
    if (this.formPriceList.invalid){
      console.error('this form is invalid');
    } else {
      this.isLoading = true;
      const newPriceList:PriceList = {
        ...this.formPriceList.value
      }


      this.priceListService.postList(newPriceList).subscribe({
        next: list=> {
          this.dialogService.alert('Exito','La Lista fue creada exitosamente').subscribe()

          this.dialogRef.close(list.id);
          this.isLoading = false;

        },
        error: err => {
          console.error('error ', err);
          this.isLoading = false;
        }
      })
    }
  }
}
