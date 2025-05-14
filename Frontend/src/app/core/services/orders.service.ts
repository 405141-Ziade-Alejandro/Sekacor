import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../interfaces/orders/order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  ordersUrl:string = "http://localhost:8080/orders"

  httpClient: HttpClient = inject(HttpClient)


  postOrder(order:Order):Observable<Order> {
    return this.httpClient.post<Order>(this.ordersUrl, order);
  }

  putOrder(order: Order):Observable<Order> {
    return this.httpClient.put<Order>(this.ordersUrl, order);
  }

  cancelOrder(order: Order):Observable<Order> {
    return this.httpClient.put<Order>(this.ordersUrl+"/"+order.id+"/cancel", order);
  }

}
