import { ActivatedRoute, Router } from '@angular/router';
import { StockService ,Config, IStock} from 'src/app/Shared/Stock.service';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, NgZone, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { IStockModel, SignalrService } from 'src/app/Shared/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { exhaustMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css' ]
})


export class StockDetails  implements AfterViewInit  {
   
    
  @Input()  stocks: IStock[];
    url ="https://localhost:7192/api/";
     displayedColumns: string[] = ['stokeId', 'stockName', 'price'];
    
     dataSource: any;
    constructor(
      private router: Router,
        private StokService: StockService,
        private route: ActivatedRoute,
        public signalRService: SignalrService, private http: HttpClient,private zone: NgZone
      ) {}

  
      ngOnInit() {
        this.StokService.getAllStocks()
        this.signalRService.startConnection();
        this.signalRService.addStocksPriceListener(); 
        
         this.signalRService.AllFeedObservable.subscribe(
          (data) => {
            
            debugger;
            
            this.stocks = data;
            this.dataSource= new MatTableDataSource<IStock>(this.stocks);
            this.dataSource.paginator = this.paginator;
           console.log(this.stocks);
           this.zone.run(() => { });
          },
          (error) => {
            console.log(error);
          }
        );
      }
        
      
       @ViewChild(MatPaginator) paginator: MatPaginator;
  
    ngAfterViewInit() {
      this.startHttpRequest();
      this.StokService.getAllStocks().subscribe( (data) => {
        this.stocks = [];
        this.dataSource= [];
        debugger;
        this.stocks = data;
        this.dataSource= new MatTableDataSource<IStock>(this.stocks);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      });
      
    }
    
    
    private startHttpRequest = () => {
      this.http.get(this.url+"Market")
        .subscribe(res => {
        })}

      
}
