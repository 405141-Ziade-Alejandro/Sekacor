import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TankType} from "../interfaces/tank-type";
import {Observable} from "rxjs";
import {NewTankType} from "../interfaces/new-tank-type";

@Injectable({
  providedIn: 'root'
})
export class TankServiceService {

  constructor() {
  }

  private apiTankTypes: string = 'http://localhost:8080/tanks/type'

  private readonly httpClient = inject(HttpClient);

  private updating:boolean = false;

  postTankType(tankType: TankType): Observable<TankType> {
    return this.httpClient.post<TankType>(this.apiTankTypes, tankType);
  }

  getAllTankTypes(): Observable<TankType[]> {
    return this.httpClient.get<TankType[]>(this.apiTankTypes + '/all');
  }

  getTankType(id: number): Observable<TankType> {
    return this.httpClient.get<TankType>(this.apiTankTypes + '/' + id);
  }

  putTankType(id:number,newTank:NewTankType): Observable<TankType> {
    return this.httpClient.put<TankType>(this.apiTankTypes + '/' + id, newTank);
  }

  deleteTankType(id:number): Observable<void> {
    return this.httpClient.delete<void>(this.apiTankTypes + '/' + id)
  }

  getUpdate():boolean {
    return this.updating
  }

  setUpdating(updating:boolean) {
    this.updating = updating;
  }
}
