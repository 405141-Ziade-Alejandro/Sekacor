import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../interfaces/orders/order";
import {Observable} from "rxjs";
import {PageResponse} from "../interfaces/page-response";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() {
  }

  ordersUrl: string = "http://localhost:8080/orders"

  httpClient: HttpClient = inject(HttpClient)


  postOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.ordersUrl, order);
  }

  putOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.ordersUrl, order);
  }

  cancelOrder(id:number): Observable<Order> {
    return this.httpClient.put<Order>(this.ordersUrl+"/"+id+"/cancel", null);
  }

  getAllOrders(page: number, size: number, sortBy: string = 'orderDate', order: string = 'desc'): Observable<PageResponse<Order>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.httpClient.get<PageResponse<Order>>(this.ordersUrl, {params})
  }

  getById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.ordersUrl}/${id}`)
  }

}
