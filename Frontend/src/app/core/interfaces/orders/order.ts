import {OrderDetail} from "./order-detail";

export interface Order {

  id:number,

  createdDate:string,

  lastUpdatedAt:string,

  orderDate:string

  clientId:number,

  orderDetails:OrderDetail[],

  totalPrice:number

  state:string
}
