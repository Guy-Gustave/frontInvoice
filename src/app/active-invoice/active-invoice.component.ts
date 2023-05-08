import { Component } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-active-invoice',
  templateUrl: './active-invoice.component.html',
  styleUrls: ['./active-invoice.component.css']
})
export class ActiveInvoiceComponent {
    invoices: any;
    constructor(

        private _invoicesService: InvoicesService) { }
    
      ngOnInit(): void {
        this._invoicesService.getInvoicesDetails().subscribe({
          next: (res: any) => {
            console.log('details===>',res)
            this.invoices = res.data;
          }
        })
      }

    editInvoice(data: any): void {
        console.log('hello!',data )
    }

}