import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PrimaryConsumable} from "../interfaces/consumable/primary-consumable";
import {Observable} from "rxjs";
import {SecondaryConsumable} from "../interfaces/consumable/secondary-consumable";
import {UpdateConsumable} from "../interfaces/consumable/update-consumable";

@Injectable({
  providedIn: 'root'
})
export class ConsumablesService {

  constructor() {
  }

  private httpClient = inject(HttpClient)

  private secondaryUrl: string = "http://localhost:8080/Consumable/secondary"
  private primaryUrl: string = "http://localhost:8080/Consumable/primary"

  getAllPrimaryConsumables(): Observable<PrimaryConsumable[]> {
    return this.httpClient.get<PrimaryConsumable[]>(this.primaryUrl)
  }

  putPrimaryConsumable(update: UpdateConsumable): Observable<PrimaryConsumable> {
    return this.httpClient.put<PrimaryConsumable>(this.primaryUrl, update)
  }

  getAllSecondaryConsumables(): Observable<SecondaryConsumable[]> {
    return this.httpClient.get<SecondaryConsumable[]>(this.secondaryUrl)
  }

  putSecondaryConsumable(update: UpdateConsumable): Observable<SecondaryConsumable> {
    return this.httpClient.put<SecondaryConsumable>(this.secondaryUrl, update)
  }

  postSecondaryConsumable(consumable: SecondaryConsumable): Observable<SecondaryConsumable> {
    return this.httpClient.post<SecondaryConsumable>(this.secondaryUrl, consumable)
  }

  deleteSecondaryConsumable(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.secondaryUrl + '/' + id)
  }
}
