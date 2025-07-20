import {inject, Injectable, signal} from '@angular/core';
import {Observable, tap} from "rxjs";
import {User} from "../interfaces/users/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  private userSignal = signal<User | null>(this.loadUser())
  private httpClient = inject(HttpClient)

  private logInApiUrl: string = "http://localhost:8080/users/login"

  logIn(userName: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.logInApiUrl, {userName, password}).pipe(
      tap(res => {
        localStorage.setItem("user", JSON.stringify(res));
        this.userSignal.set(res)
      })
    )
  }

  private loadUser(): User | null {
    const json = localStorage.getItem('user');
    return json ? JSON.parse(json) : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSignal.set(null);
  }

  //todo: if the user  has been   deleted, it will still allow them to operate if they are in the localstorage
  currentUser() {
    return this.userSignal.asReadonly()
  }

  isLoggedIn(): boolean {
    return !!this.userSignal()
  }

  hasRole(...roles: string[]): boolean {
    const user = this.userSignal();
    return user ? roles.includes(user.role) : false;
  }
}
