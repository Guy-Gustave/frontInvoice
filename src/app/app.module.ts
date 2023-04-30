import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ActiveInvoiceComponent } from './active-invoice/active-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    InvoiceListComponent,
    ActiveInvoiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
