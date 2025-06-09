import {Component, inject} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "./core/services/auth.service";


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
}
