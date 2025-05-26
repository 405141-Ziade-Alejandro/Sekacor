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
  private priceUrl = 'http://localhost:8080/prices';

  getAllPrices(): Observable<PriceList[]> {
    return this.httpClient.get<PriceList[]>(this.priceUrl);
  }

  postList(newPriceList: PriceList):Observable<PriceList> {
    return this.httpClient.post<PriceList>(this.priceUrl, newPriceList);
  }

  delete(id:number):Observable<void> {
    return this.httpClient.delete<void>(this.priceUrl + '/' + id);
  }
}
