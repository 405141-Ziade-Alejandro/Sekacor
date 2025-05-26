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
  formUser:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  //services
  private userService = inject(UserService)
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
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: data => {
          console.log('deleted user', data)
          this.loadUsers()
        },
        error: error => {
          console.error(error)
        }
      })
    }
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
