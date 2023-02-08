import { Injectable } from '@angular/core';
import { IOrder ,IOrderParameter} from './IModel/Order';
import {ServecisHandlers} from './Serves-Handlers.service';

@Injectable({
  providedIn: 'any'
})

export class OrdersService {
  url ="https://localhost:7192/api/";
  constructor(private servecisHandlers:ServecisHandlers) { }

  public GetOrders():any{
    var data= this.servecisHandlers.GetService<IOrder>(this.url+"Orders");
    console.log(data);
    return data;
  }

  public AddOrder(IOrderParameter):any{
     return this.servecisHandlers.PostService<IOrderParameter>(this.url+"Orders",IOrderParameter);
  }

}

