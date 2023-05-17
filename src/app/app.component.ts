import { Component } from '@angular/core';
import { InvoicesService } from './services/invoices.service';
import { Invoice } from './shared/invoice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'invoices';

  items: any[] = [];
  invoices: any[] = [];

  constructor(private _invoicesService: InvoicesService) {}

  ngOnInit(): void {
    this._invoicesService.getItemsList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.items = res;
      },
    });

    this._invoicesService.getInvoicesList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.invoices = res;
      },
    });
  }

  showInvoice = false;
  selectedItem: any;
  showEditInvoice = false;
  selectedInvoice: any;

  onPurchaseItem(item: any) {
    this.selectedItem = item;
    this.showInvoice = true;
  }

  onCloseInvoice() {
    this.showInvoice = false;
  }

  onEditInvoice(invoice: any) {
    this.selectedInvoice = invoice;
    this.showEditInvoice = true;
  }

  onCloseEditInvoice() {
    this.showEditInvoice = false;
  }

  onSaveInvoice(invoice: any) {
    // Update the invoice in the backend
    // this._invoicesService.eupdateInvoice(id, dataI).subscribe((res) => {
    //   console.log('Item added!', res);
    // });

    // Update the invoice in the local array
    const index = this.invoices.findIndex((i) => i.id === invoice.id);
    this.invoices[index] = invoice;

    // Close the edit invoice form
    this.showEditInvoice = false;
  }
}
