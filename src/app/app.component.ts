import { Component } from '@angular/core';
import { InvoicesService } from './services/invoices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'invoices';

  items: any[] = [];

  constructor(private _invoicesService: InvoicesService) {}

  ngOnInit(): void {
    this._invoicesService.getItemsList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.items = res;
      },
    });
  }

  showInvoice = false;
  selectedItem: any;

  onPurchaseItem(item: any) {
    this.selectedItem = item;
    this.showInvoice = true;
  }

  onCloseInvoice() {
    this.showInvoice = false;
  }
}
