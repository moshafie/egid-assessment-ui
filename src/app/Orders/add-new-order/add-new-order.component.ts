import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IOrder, IOrderParameter,BrokerDto } from 'src/app/Shared/IModel/Order';
import { ServecisHandlers } from 'src/app/Shared/Serves-Handlers.service';
import { SignalrService } from 'src/app/Shared/signalr.service';
import { IStock, StockService } from 'src/app/Shared/Stock.service';

@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.css']
})
export class AddNewOrderComponent implements OnInit {
  url ="https://localhost:7192/api/";
  Brokers:BrokerDto[]=[]; 
  Stoks:IStock[]=[];
  constructor(private _ServecisHandlers:ServecisHandlers,private _StockService:StockService,
   private signalRService:SignalrService ,private zone: NgZone) { }

  ngOnInit(): void {
    this._ServecisHandlers.GetService<BrokerDto[]>(this.url+"Broker").subscribe((data)=>{
      this.Brokers=data;
      console.log(data);
    });

   this._StockService.getAllStocks().subscribe((data)=>{
      this.Stoks=data;
      console.log(data);
    }
    );

      
  }
  onSubmit(){
    console.log("onSubmit");
    this.addNewOrder( )
  }
  //creat form groupe 
 
  orderForm= new FormGroup({
    stockName: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    Broker: new FormControl(''),
  })
  
  //add new order
  addNewOrder(){
 debugger;

    var order:IOrderParameter={
      stockId:this.orderForm.value.stockName.stokeId,
      Price:this.orderForm.value.price,
      Quantity:this.orderForm.value.quantity,
      BrokerId:this.orderForm.value.Broker.id,
      personId:this.orderForm.value.Broker.personId,
      Commission:0,
      ID:0
    }
    console.log("order");
    console.log(order);
    this._ServecisHandlers.PostService<IOrderParameter>(this.url+"Orders",order).subscribe();
    
  }

  changeBroKer(event){
    // this.orderForm.setValue({BrokerId:event.target.value});
    console.log(event.target.value);
  }
  changeStock(event){
      this.orderForm.patchValue({price:this.Stoks.find(x=>x.stokeId==this.orderForm.value.stockName.stokeId).price});
      this.signalRService.startConnection();
      this.signalRService.addStocksPriceListener();
      this.signalRService.AllFeedObservable.subscribe(
        (data) => {
        this.Stoks.map((item)=>{
          debugger;
          item.price = data.find(x=>x.stokeId==item.stokeId).price;
          this.orderForm.patchValue({price:item.price});
          this.zone.run(() => { });
          return item;
        })});  
  }

}
