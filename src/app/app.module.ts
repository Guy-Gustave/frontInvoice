import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemsComponent } from './items/items.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ActiveInvoiceComponent } from './active-invoice/active-invoice.component';
// import { ToastrModule } from 'ngx-toastr';
// import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    InvoiceListComponent,
    ActiveInvoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    // ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
