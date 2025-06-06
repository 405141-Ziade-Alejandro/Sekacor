import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard:CanActivateFn = (route:ActivatedRouteSnapshot) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if (!auth.isLoggedIn()){
    alert("necesita estar logueado para esta accion")
    router.navigate(['/login'])
    return false
  }

  const currentUser = auth.currentUser()()

  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (allowedRoles && !allowedRoles.includes(currentUser?.role ?? '')){
    alert('no tenes permiso para acceder a esta seccion')
    router.navigate(['/'])
    return false
  }

  return true
}
