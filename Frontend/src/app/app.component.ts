import {Component, inject} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
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
  //variables
  //methods
  logOut() {
    this.authService.logout()
  }
}
