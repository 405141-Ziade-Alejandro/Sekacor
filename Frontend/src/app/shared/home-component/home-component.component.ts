import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ReportTanksMadeComponent} from "../../features/reports/report-tanks-made/report-tanks-made.component";
import {
  ReportSoldToClientsComponent
} from "../../features/reports/report-sold-to-clients/report-sold-to-clients.component";

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatIcon,
    ReportTanksMadeComponent,
    ReportSoldToClientsComponent
  ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
