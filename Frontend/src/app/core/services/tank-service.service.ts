import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TankType} from "../interfaces/tanks/tank-type";
import {Observable} from "rxjs";
import {NewTankType} from "../interfaces/tanks/new-tank-type";
import {Tank} from "../interfaces/tanks/tank";
import {PageResponse} from "../interfaces/page-response";
import {MissingConsumable} from "../interfaces/tanks/missing-consumable";


export type TankResponse = Tank | MissingConsumable[]

@Injectable({
  providedIn: 'root'
})
export class TankServiceService {

  constructor() {
  }

  private apiTankTypes: string = 'http://localhost:8080/tanks/type'
  private apiTank: string = 'http://localhost:8080/tanks'

  private readonly httpClient = inject(HttpClient);

  private updating: boolean = false;

  postTankType(tankType: TankType): Observable<TankType> {
    return this.httpClient.post<TankType>(this.apiTankTypes, tankType);
  }

  getAllTankTypes(): Observable<TankType[]> {
    return this.httpClient.get<TankType[]>(this.apiTankTypes + '/all');
  }

  getTankType(id: number): Observable<TankType> {
    return this.httpClient.get<TankType>(this.apiTankTypes + '/' + id);
  }

  putTankType(id: number, newTank: NewTankType): Observable<TankType> {
    return this.httpClient.put<TankType>(this.apiTankTypes + '/' + id, newTank);
  }

  deleteTankType(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiTankTypes + '/' + id)
  }

  getUpdate(): boolean {
    return this.updating
  }

  setUpdating(updating: boolean) {
    this.updating = updating;
  }

  deleteTank(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiTank + '/' + id)
  }

  getAllTanksPaginated(page: number,size:number,sortBy:string='id',order:string='desc'):Observable<PageResponse<Tank>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('order',order)

    return this.httpClient.get<PageResponse<Tank>>(this.apiTank+'/all',{params})
  }

  postTank(dto: Tank, force:boolean = false): Observable<TankResponse> {
    const params = new HttpParams().set('force', force.toString())

    return this.httpClient.post<TankResponse>(this.apiTank,dto,{params})
  }

  getTanksReport(start:Date,end:Date):Observable<Tank[]>{
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString())

    return this.httpClient.get<Tank[]>(this.apiTank+"/reports/tank-made",{params})
  }
}
