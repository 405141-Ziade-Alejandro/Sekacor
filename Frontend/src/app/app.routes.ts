import {Routes} from '@angular/router';
import {HomeComponentComponent} from "./features/home-component/home-component.component";
import {TankTypeListComponent} from "./features/TankTypes/tank-type-list/tank-type-list.component";
import {NewTankTypeComponent} from "./features/TankTypes/new-tank-type/new-tank-type.component";
import {TankTypeExamineComponent} from "./features/TankTypes/tank-type-examine/tank-type-examine.component";
import {PricesListComponent} from "./features/prices/prices-list/prices-list.component";
import {ClientsComponent} from "./features/client/clients/clients.component";
import {PrimaryConsumablesComponent} from "./features/consumables/primary-consumables/primary-consumables.component";
import {
  SecundaryConsumablesComponent
} from "./features/consumables/secundary-consumables/secundary-consumables.component";
import {TankRegistryComponent} from "./features/TankTypes/tank-registry/tank-registry.component";
import {UserListComponent} from "./features/users/user-list/user-list.component";
import {ProductionHistoryComponent} from "./features/TankTypes/production-history/production-history.component";
import {NewOrderComponent} from "./features/orders/new-order/new-order.component";
import {OrderListComponent} from "./features/orders/order-list/order-list.component";
import {OrderComponent} from "./features/orders/order/order.component";
import {EditOrderComponent} from "./features/orders/edit-order/edit-order.component";
import {ReportTanksMadeComponent} from "./features/reports/report-tanks-made/report-tanks-made.component";
import {LoginComponent} from "./features/login/login.component";
import {authGuard} from "./core/guards/auth-guard";

export const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'tanktypes', component: TankTypeListComponent},
  {path: 'newtanktypes', component: NewTankTypeComponent, canActivate:[authGuard], data:{roles:['ADMIN']}},
  {path: 'tanktypes/:id', component: TankTypeExamineComponent, canActivate:[authGuard], data:{roles:['ADMIN','EMPLEADO']}},
  {path: 'prices', component: PricesListComponent},
  {path: 'clients', component: ClientsComponent,canActivate:[authGuard], data:{roles:['ADMIN','TRANSPORTISTA']}},
  {path: 'consumables/primary', component: PrimaryConsumablesComponent,canActivate:[authGuard], data:{roles:['ADMIN']}},
  {path: 'consumables/secondary', component: SecundaryConsumablesComponent,canActivate:[authGuard], data:{roles:['ADMIN','TRANSPORTISTA']}},
  {path: 'production', component: TankRegistryComponent, canActivate:[authGuard], data:{roles:['ADMIN','EMPLEADO']}},
  {path: 'production/history', component: ProductionHistoryComponent,canActivate:[authGuard], data:{roles:['ADMIN',"EMPLEADO"]}},
  {path: 'users/lists', component: UserListComponent, canActivate:[authGuard], data:{roles:['ADMIN']}},
  {path: 'orders/new', component: NewOrderComponent, canActivate:[authGuard], data:{roles:['ADMIN']}},
  {path: 'orders/all', component: OrderListComponent},
  {path: 'orders/:id', component: OrderComponent},
  {path: 'orders/:id/edit', component: EditOrderComponent, canActivate:[authGuard], data:{roles:['ADMIN']}},
  {path: 'report/tanks', component: ReportTanksMadeComponent},
  {path:'login', component: LoginComponent},
];
