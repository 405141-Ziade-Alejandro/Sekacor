import {Component, inject} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {DialogService} from "../../core/services/dialog.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  //service
  auth = inject(AuthService)
  router = inject(Router)
  dialogService = inject(DialogService)
  //variables
  isLoading:boolean = false;
  //methods
  login() {
    this.isLoading = true;
    let {username, password} = this.form.value;
    username = username.trim()
    this.auth.logIn(username, password).subscribe({
      next: () => {
        this.isLoading=false
        this.router.navigate(['/']);

      },
      error: err => {
        this.dialogService.alert('Usuario o contraseña equivocados','Revise  los campos')
        console.log(err)
        this.isLoading=false
      }
    })
  }
}
