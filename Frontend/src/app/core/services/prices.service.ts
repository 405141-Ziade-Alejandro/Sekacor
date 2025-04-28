import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PriceList} from "../interfaces/prices/price-list";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor() { }
 private  httpClient = inject(HttpClient)
  private url = 'http://localhost:8080/prices';

  getAllPrices(): Observable<PriceList[]> {
    return this.httpClient.get<PriceList[]>(this.url);
  }
}
