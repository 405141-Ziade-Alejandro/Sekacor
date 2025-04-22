import { Routes } from '@angular/router';
import {HomeComponentComponent} from "./features/home-component/home-component.component";
import {TankTypeListComponent} from "./features/TankTypes/tank-type-list/tank-type-list.component";
import {NewTankTypeComponent} from "./features/TankTypes/new-tank-type/new-tank-type.component";

export const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path:'tanktypes',component: TankTypeListComponent},
  {path:'newtanktypes',component: NewTankTypeComponent}
];
