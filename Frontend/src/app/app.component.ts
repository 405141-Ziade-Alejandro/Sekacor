import { Component } from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatIconButton, MatIcon, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  shouldRun = true;
}
