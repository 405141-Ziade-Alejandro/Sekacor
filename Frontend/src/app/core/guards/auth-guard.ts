import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {DialogService} from "../services/dialog.service";

export const authGuard:CanActivateFn = (route:ActivatedRouteSnapshot) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  const dialogService = inject(DialogService)

  if (!auth.isLoggedIn()){
    dialogService.alert('Error','Necesita estar logueado para esta accion').subscribe()
    router.navigate(['/login'])
    return false
  }

  const currentUser = auth.currentUser()()

  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (allowedRoles && !allowedRoles.includes(currentUser?.role ?? '')){
    dialogService.alert('Error','Usted no tiene permisos para acceder a esta seccion').subscribe()
    router.navigate(['/'])
    return false
  }

  return true
}
