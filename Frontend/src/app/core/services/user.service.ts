import {inject, Injectable} from '@angular/core';
import {User} from "../interfaces/users/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private userUrl: string = "http://localhost:8080/users";

  private httpClient = inject(HttpClient)

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl+"/all")
  }

  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.userUrl, user)
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.userUrl + "/" + id)
  }

  //todo make the change of password
}
