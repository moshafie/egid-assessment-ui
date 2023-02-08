import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavBar } from './Nav/navbr.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StockDetails } from './Stock/Stock-details/Stock-details.component';
import { StokeAppComponent } from './Stock/Stoks-App.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { StockService } from './Shared/Stock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './orders/order-list/order-list/order-list.component';
import { ServecisHandlers } from './Shared/Serves-Handlers.service';
import { OrdersService } from './Shared/orders.service';
import { AddNewOrderComponent } from './orders/add-new-order/add-new-order.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBar,
    StockDetails,
    StokeAppComponent,
    OrderListComponent,
    AddNewOrderComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule ,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [
    StockService,
    ServecisHandlers,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
