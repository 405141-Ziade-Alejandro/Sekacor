import {Component, inject} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "./core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Extras} from "./core/interfaces/extras";
import {ExtraDialogComponent} from "./shared/extra-dialog/extra-dialog.component";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";

const FAQ:Extras ={
  info: [
    {title:'question',message:'Answer'},
    {title:'question',message:'Answer'},
    {title:'question',message:'Answer'}
  ], Headline: "FAQ"
}
//todo: make the terms and   conditions right
const TERMS_AND_CONDITIONS:Extras ={
  Headline:'Terminos Y Condiciones',
  info: [
    {title:'',message:'Este sistema fue desarrollado por Alejandro Ziade como parte de una práctica profesional supervisada para la carrera de Tecnicatura Universitaria en Programación (UTN - Facultad Regional Córdoba).'},
    {title:'',message:'Está destinado exclusivamente al uso interno de la empresa Sekacor, para facilitar la gestión de producción, clientes y envíos.'},
    {title:'',message:'Toda la información ingresada debe ser precisa y completa. El uso indebido del sistema o el ingreso de datos falsos puede generar errores o mal funcionamiento.'},
    {title:'',message:'El desarrollador no se hace responsable por el uso incorrecto del sistema, ni por pérdidas derivadas del uso de la herramienta fuera de los fines para los que fue diseñada.'},
    {title:'',message:'Los datos registrados no se comparten con terceros y se utilizan únicamente con fines operativos internos de la empresa.'},
    {title:'',message:'Al utilizar este sistema, usted acepta estos términos.'},
    ]
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatIconButton, MatIcon, RouterOutlet, RouterLink, MatNavList, MatListItem, MatButton, MatListItemIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
//services
  authService = inject(AuthService)
  router = inject(Router)
  dialog =  inject(MatDialog)
  //variables
  get userName(){
    const name = this.authService.currentUser()();
    if(name){
      return name.name;
    } else {
      return '';
    }
  }
  //methods
  logOut() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  logIn() {
    this.router.navigate(['/login'])
  }

  openFaq(){
    this.dialog.open(ExtraDialogComponent,{
      data: FAQ,
    })
  }

  openTermsAndCondition(){
    this.dialog.open(ExtraDialogComponent,{
      data: TERMS_AND_CONDITIONS
    })
  }
}
