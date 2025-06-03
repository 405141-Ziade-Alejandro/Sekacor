import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../interfaces/users/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private userSignal = signal<User|null>(this.loadUser())
  private httpClient =  inject(HttpClient)

  private logInApiUrl:string = "http://localhost:8080/users/login"

  logIn(userName:string,password:string):Observable<User>{
    return this.httpClient.post<User>(this.logInApiUrl,{userName,password}).pipe(
      tap(res =>{
        localStorage.setItem("user", JSON.stringify(res));
        this.userSignal.set(res)
      })
    )
  }

  private loadUser():User|null {
    const json = localStorage.getItem('user');
    return json ? JSON.parse(json) : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSignal.set(null);
  }

  currentUser() {
    return this.userSignal.asReadonly()
  }

  isLoggedIn() {
    return !!this.userSignal()
  }
}
