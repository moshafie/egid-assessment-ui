import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockDetails } from './Stock/Stock-details/Stock-details.component';
import { OrderListComponent } from './orders/order-list/order-list/order-list.component';
import { AddNewOrderComponent } from './orders/add-new-order/add-new-order.component';

export const appRoutes: Routes = [
  { path: 'stoks', component: StockDetails },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: AddNewOrderComponent },
  { path: '', redirectTo: '/stoks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
