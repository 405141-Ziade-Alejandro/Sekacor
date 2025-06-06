import {Component, inject} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/interfaces/users/user";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogService} from "../../../core/services/dialog.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  //form
  formUser: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  //services
  private userService = inject(UserService)
  dialogService = inject(DialogService)
  //variables
  displayedColumns: string[] = ['Nombre', 'Rol', 'actions'];
  userList: User[] = [];

  //methods
  ngOnInit() {
    this.loadUsers()
  }

  private loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data
      },
      error: error => {
        console.log(error)
      }
    })
  }

  delete(id: number) {
    this.dialogService.confirm('Borrar Usuario', 'Esta accion Borrara al usuario, esta seguro?')
      .subscribe(ok => {
        if (ok) {
          this.userService.deleteUser(id).subscribe({
            next: () => {
              this.dialogService.alert('Exito', 'El usuario fue borrado permanentemente').subscribe()
              this.loadUsers()
            },
            error: error => {
              console.log(error)
            }
          })
        }
      })
  }

  submit() {
    if (this.formUser.invalid) {
      console.error("this form is invalid")
    } else {
      const newUser: User = {
        ...this.formUser.value
      }

      this.userService.postUser(newUser).subscribe({
        next: data => {
          console.log('post user', data)
          this.dialogService.alert('Exito','Usuario'+newUser.name+' Creado').subscribe()

          this.formUser.reset()

          this.loadUsers()
        },
        error: error => {
          console.error('something went wrong', error)
        }
      })
    }
  }
}
