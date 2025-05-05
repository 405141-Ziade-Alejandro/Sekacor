import { Routes } from '@angular/router';
import {HomeComponentComponent} from "./features/home-component/home-component.component";
import {TankTypeListComponent} from "./features/TankTypes/tank-type-list/tank-type-list.component";
import {NewTankTypeComponent} from "./features/TankTypes/new-tank-type/new-tank-type.component";
import {TankTypeExamineComponent} from "./features/TankTypes/tank-type-examine/tank-type-examine.component";
import {PricesListComponent} from "./features/prices/prices-list/prices-list.component";
import {ClientsComponent} from "./features/client/clients/clients.component";
import {PrimaryConsumablesComponent} from "./features/consumables/primary-consumables/primary-consumables.component";
import {SecundaryConsumablesComponent} from "./features/consumables/secundary-consumables/secundary-consumables.component";
import {TankRegistryComponent} from "./features/TankTypes/tank-registry/tank-registry.component";
import {UserListComponent} from "./features/users/user-list/user-list.component";

export const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path:'tanktypes',component: TankTypeListComponent},
  {path:'newtanktypes',component: NewTankTypeComponent},
  {path:'tanktypes/:id',component: TankTypeExamineComponent},
  {path:'prices',component:PricesListComponent},
  {path: 'clients',component:ClientsComponent},
  {path: 'consumables/primary', component:PrimaryConsumablesComponent},
  {path: 'consumables/secondary', component:SecundaryConsumablesComponent},
  {path:'production', component:TankRegistryComponent},
  {path:'users/lists', component:UserListComponent},
];
