import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TankType} from "../interfaces/tank-type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TankServiceService {

  constructor() {
  }

  private apiTankTypes: string = 'http://localhost:8080/tanks/type'

  private readonly httpClient = inject(HttpClient);

  postTankType(tankType: TankType): Observable<TankType> {
    return this.httpClient.post<TankType>(this.apiTankTypes, tankType);
  }

  getAllTankTypes(): Observable<TankType[]> {
    return this.httpClient.get<TankType[]>(this.apiTankTypes + '/all');
  }

  deleteTankType(id:number): Observable<void> {
    return this.httpClient.delete<void>(this.apiTankTypes + '/' + id)
  }
}
