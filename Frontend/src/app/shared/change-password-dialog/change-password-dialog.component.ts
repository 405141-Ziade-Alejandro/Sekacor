import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/interfaces/users/user";
import {AuthService} from "../../core/services/auth.service";
import {DialogService} from "../../core/services/dialog.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PasswordChange} from "../../core/interfaces/users/password-change";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressSpinner
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  private dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>)
  //form
  formPassword:FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),

  })
  //service
  private userService = inject(UserService)
  private authService = inject(AuthService)
  private dialogService = inject(DialogService)
  //variables
  currentUser:User = {
    id: 0, name: "", role: ""
  }
  isLoading:boolean = false;
  //methods
  ngOnInit() {
    const user = this.authService.currentUser()()
    if (user) {
      this.currentUser = user;
    }
  }

  changePassword(){
    if (this.formPassword.invalid){
      this.dialogService.alert('Error','this form is invalid').subscribe()
      return
    } else {
      this.isLoading = true;
      const form = {
        ...this.formPassword.value
      }
      console.log(form);
      if(!this.checkIdentical(form.newPassword,form.repeatPassword)){
        this.dialogService.alert('Error','Las contraseñas no son iguales').subscribe()
        this.formPassword.reset()
        return
      }
      const passwordChange:PasswordChange = {
        userId:this.currentUser.id,
        newPassword:form.newPassword,
        oldPassword:form.oldPassword,
      }
      this.userService.changePassword(passwordChange).subscribe({
        next: ok=>{
          if (ok){
            this.dialogService.alert('Exito','La contraseña se cambio correctamnte')
            this.isLoading=false;
          } else {
            this.dialogService.alert('Error','La contraseña vieja no es correcta')
            this.isLoading = false;
            return
          }
        },
        error: err => {
          console.error(err)
          this.isLoading = false;
        }
      })
    }
    this.closeDialog()
  }

  checkIdentical(newPassword:string,repeatedPassword:string):boolean{
    if (newPassword===repeatedPassword){
      return true
    }else {
      return false
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
