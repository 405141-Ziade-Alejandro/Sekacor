import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
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
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {Extras} from "../../../core/interfaces/extras";
import {FaqComponent} from "../../../shared/faq/faq.component";

const FAQ: Extras = {
  Headline: "FAQ",
  info: [
    {
      title: '¿Cómo creo un usuario con rol de administrador?',
      message: 'Debido al alto nivel de permisos que tiene un usuario con rol de administrador, se recomienda contactar al desarrollador del sistema para que lo registre directamente en la base de datos.',
    }
  ]
}

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
    MatIcon,
    MatMiniFabButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatSort,
    MatSortHeader,
    MatCard,
    MatDivider,
    MatCardContent,
    FaqComponent
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
  displayedColumns: string[] = ['name', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>([])

  isLoading: boolean = false;

  //methods
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadUsers()
  }

  private loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.dataSource.data = data
      },
      error: error => {
        console.log(error)
      }
    })
  }

  delete(id: number) {

    this.dialogService.confirm('Borrar Usuario', 'Esta accion Borrara al usuario, esta seguro?')
      .subscribe(ok => {
        this.isLoading = true;
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
        this.isLoading = false;
      })
  }

  submit() {
    if (this.formUser.invalid) {
      console.error("this form is invalid")
    } else {
      this.isLoading = true;
      const newUser: User = {
        ...this.formUser.value
      }

      this.userService.postUser(newUser).subscribe({
        next: data => {
          console.log('post user', data)
          this.dialogService.alert('Exito', 'Usuario' + newUser.name + ' Creado').subscribe()

          this.formUser.reset()

          this.loadUsers()
          this.isLoading = false
        },
        error: error => {
          console.error('something went wrong', error.message)
          this.isLoading = false
        }
      })
    }
  }

  protected readonly FAQ = FAQ;
}
