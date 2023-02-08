import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable ,Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public url ="https://localhost:7192/";
  public data: IStockModel[];
  private hubConnection: signalR.HubConnection
  private $allFeed: Subject<IStockModel[]> = new Subject<IStockModel[]>();

public get AllFeedObservable(): Observable<IStockModel[]> {
  return this.$allFeed.asObservable();
}
  public startConnection = () => {
  
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl("https://localhost:7192/Market")
                              .build();
      this.hubConnection
        .start()
        .then(() =>{debugger; console.log('Connection started')})
        .catch(err => console.log('Error while starting connection: ' + err))
        
    }

    public addStocksPriceListener = () => {
     this.hubConnection.on('ReceiveNewPrice', (data) => {
        debugger;
        this.data = data;
        this.$allFeed.next(data);
        return this.data;
      }) ;
  
    }

}
export interface IStockModel {
  stokeId: number;
  stockName: string;
  price: number;
}