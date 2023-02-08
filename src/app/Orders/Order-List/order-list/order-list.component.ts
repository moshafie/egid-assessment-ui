import { Component, Input, NgZone, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Shared/orders.service';
import { IOrder } from 'src/app/Shared/IModel/Order';
import { SignalrService } from 'src/app/Shared/signalr.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() Orders: IOrder[];
 
  constructor(private OrdersService: OrdersService,public signalRService: SignalrService
      ,private zone: NgZone ,private router: Router ) { }
  
  ngOnInit(): void {
    this.getOrders()
    this.signalRService.startConnection();

         this.signalRService.addStocksPriceListener(); 
         this.signalRService.AllFeedObservable.subscribe(
          (data) => {
         this.Orders.map((item)=>{
          debugger;
            item.Price = data.find(x=>x.stokeId==item.Stoke.StokeId).price;
            return item;
         })
         console.log(this.Orders[0].Price);
         this.zone.run(() => { });
          ;})
          
  }
  ngAfterViewInit() {
    this.getOrders.bind(this);
  }

  getOrders(){
    this.OrdersService.GetOrders().subscribe((data: any) => {
      this.Orders = data;
      console.log(data);
    });
    
  }
  editOrder(id){
    console.log(id);
  }
  addOrder(){
    this.router.navigate(['orders/new'])
  }

}
