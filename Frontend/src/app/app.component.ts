import {Component, inject} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "./core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Extras} from "./core/interfaces/extras";
import {ExtraDialogComponent} from "./shared/extra-dialog/extra-dialog.component";

const FAQ:Extras ={
  info: [
    {title:'question',message:'Answer'},
    {title:'question',message:'Answer'},
    {title:'question',message:'Answer'}
  ], Headline: "FAQ"
}
const TERMS_AND_CONDITIONS:Extras ={
  Headline:'Terms And Conditions',
  info: [
    {title:'Protección de datos personales:',message:'Es el derecho del usuario de una aplicación de software, a decidir o autorizar de forma libre, previa, expresa e informada la recolección, uso o tratamiento de los datos personales, así como de conocer, actualizar, rectificar, suprimir o controlar lo que se hace con la información". Toda aplicación publicada y disponible para descargar, tiene que incluir una forma de que el usuario en caso de dejar de usar la app, pueda gestionar la eliminación de sus datos perdonales, capturados por la misma, además de la desinstalación'},
    {title:'Términos y condiciones: ',message:'Hacen referencia al marco legal de uso de la aplicación, sus condiciones, propiedad intelectual y gestión  de seguridad de datos gestionados en el sitio o licencias. También se puede mencionar el uso de cookies. '},
    {title:'',message:'El contenido de la sección no es fija y depende de la función del sistema o aplicación. En caso de publicar el sistema desarrollado en la carrera, les sugerimos consultar a un especialista en leyes relacionadas a licencias de desarrollo de software para incluir todos los aspectos '}
  ]
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatIconButton, MatIcon, RouterOutlet, RouterLink],
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
