import {Component, inject} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
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
  //variables
  //methods
  login() {
    const {username, password} = this.form.value;
    this.auth.logIn(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        alert('error on the login');
        console.log(err)
      }
    })
  }
}
