import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemsComponent } from './items/items.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
// import { ActiveInvoiceComponent } from './active-invoice/active-invoice.component';
import { InvoicesService } from './services/invoices.service';
import { ActiveInvoiceComponent } from './active-invoice/active-invoice.component';
// import { ToastrModule } from 'ngx-toastr';
// import { ReactiveFormsModule } from '@angular/forms';
// import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
    FormsModule,
    
    
    // ToastrModule.forRoot()
  ],
  providers: [InvoicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
