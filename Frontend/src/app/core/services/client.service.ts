import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../interfaces/client/client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  private httpClient =inject(HttpClient)

  private clientUrl:string = "http://localhost:8080/Clients";

  getClientList():Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.clientUrl);
  }

  postClient(client:Client):Observable<Client> {
    return this.httpClient.post<Client>(this.clientUrl, client);
  }

  deleteClient(id:number):Observable<void> {
    return this.httpClient.delete<void>(this.clientUrl+"/"+id);
  }

  putClient(client:Client):Observable<Client> {
    return this.httpClient.put<Client>(this.clientUrl, client);
  }

}
