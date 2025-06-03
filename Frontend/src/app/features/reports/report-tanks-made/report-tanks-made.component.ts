import {Component, inject, signal, Signal} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {TankServiceService} from "../../../core/services/tank-service.service";
import {TankChartEntry} from "../../../core/interfaces/reports/tank-chart-entry";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BarChartModule, NgxChartsModule} from "@swimlane/ngx-charts";
import {User} from "../../../core/interfaces/users/user";
import {TankType} from "../../../core/interfaces/tanks/tank-type";
import {Tank} from "../../../core/interfaces/tanks/tank";

@Component({
  selector: 'app-report-tanks-made',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatDatepicker,
    FormsModule,
    MatDatepickerToggle,
    MatSuffix,
    MatButton,
    BarChartModule,
    NgxChartsModule
  ],
  templateUrl: './report-tanks-made.component.html',
  styleUrl: './report-tanks-made.component.css'
})
export class ReportTanksMadeComponent {
  //services
  userService = inject(UserService)
  tankService = inject(TankServiceService)
  //variables
  startDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  endDate: Date = new Date();

  userList: User[] = [];
  tankTypeList: TankType[] = [];
  tanksMade: Tank[] = [];

  chartData: { name: string, value: number }[] = [];

  //method
  ngOnInit() {
    this.loadUsersAndTypes()
  }

  private loadUsersAndTypes() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data
      },
      error: err => {
        console.error('error al buscar los usuarios: ', err)
      }
    })
    this.tankService.getAllTankTypes().subscribe({
      next: data => {
        this.tankTypeList = data
      },
      error: err => {
        console.error('Error al buscar los tipos de tanques: ', err)
      }
    })
  }

  loadReport() {
    this.tankService.getTanksReport(this.startDate, this.endDate).subscribe({
      next: data => {
        this.tanksMade = data
        // console.log('this is the data we recive ', data)
        this.updateChart()
      },
      error: err => {
        console.error('error al buscar los tanques en las fechas selaccionadas: ', err)
      }
    })
  }

  private updateChart() {

    const countByEmployee = new Map<string, number>();

    for (const tank of this.tanksMade) {
      const employeeName = this.getEmployeeName(tank.userId)

      countByEmployee.set(
        employeeName,
        (countByEmployee.get(employeeName) ?? 0) + 1 //this means:get the current number of tanks for this employee, if not set yet assume 0 then add 1
      )
    }

    const entriesArray = Array.from(countByEmployee.entries())

    const transformed = entriesArray.map(entries => {
      const name = entries[0]
      const value = entries[1]
      return {name, value};
    })

    this.chartData = transformed;
    console.log('this is the chardata: ')
    console.table(this.chartData)

  }


  private getEmployeeName(id: number): string {
    const user = this.userList.find(u => u.id === id)
    return user ? user.name : "notFound"
  }
}
