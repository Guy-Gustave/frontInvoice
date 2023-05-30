import { Component } from '@angular/core';
import { InvoicesService } from './services/invoices.service';
import { Invoice } from './shared/invoice';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'invoices';

  items: any[] = [];

  invoic: any = {
    items: [],
    totalAmount: 0,
  };

  @Output() itemQuantityChanged = new EventEmitter<any>();

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

  // @Output() itemQuantityChanged = new EventEmitter<any>();

  onItemQuantityChanged(item: any, quantity: number) {
    item.quantity = quantity;
    item.total_amount = quantity * item.sale_price;
    this.invoic.totalAmount = this.invoic.items.reduce((acc: any, item: { total_amount: any; }) => acc + item.total_amount, 0);
    this.itemQuantityChanged.emit(item);
  }

  onPurchaseItem(item: any) {
    const itemIndex = this.invoic.items.findIndex((i: { item_id: any; }) => i.item_id === item.item_id);

    if (itemIndex!== -1) {
      this.invoic.items[itemIndex].quantity++;
    } else {
      // const quant = 1
      const itemData = {
        item_id: item.id,
        item_name: item.item_name,
        sale_price: item.sale_price,
        quantity: 1,
        unit_price: item.sale_price,
        total_amount: item.quantity* item.sale_price
      };
  
      this.invoic.items.push(itemData);
      this.invoic.total += item.total_amount;

      console.log('invvvvvvvv', this.invoic);
      this.showInvoice = true;
    }
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
