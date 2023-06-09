import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoicesService } from '../services/invoices.service';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { DialogRef } from '@angular/cdk/dialog';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-active-invoice',
  templateUrl: './active-invoice.component.html',
  styleUrls: ['./active-invoice.component.css'],
})
export class ActiveInvoiceComponent {
  invoiceForm: FormGroup
  numberOfClients: number = 1;
  clients: any[] = [];
  remainingQuantity: number = 0;
  attributted: number = this.data.quantity;
  customer_name: string = ""

  // itms: any
  // invoices: any;
  // details: any

  selectedItems: any[] = [];
  selectedInvoices: any[] = [];

  displayedColumns: string [] = ['ID', 'item_name', 'quantity', 'unit_price', 'total_price'];
  dataSource!: MatTableDataSource<any>

  invoiceDetails: any;

  constructor(
    private _fb: FormBuilder,
    private _invoicesService: InvoicesService,
    public dialogRef: MatDialogRef<ActiveInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {
    this.invoiceForm = this._fb.group({
        number: "",
        item_name: "",
        quantity: "",
        unit_price: " ",
        total_price: " ",
        total_amount: " ",
    });
  }

  ngOnInit(): void {
    // this._invoicesService.getItemsList().subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     this.items = res;
    //   },
    // });
    // this.invoiceDetails = this.data
  }

  calculateRemainingQuantity() {
    console.log('Calculating remaining quantity...');
    this.remainingQuantity = this.data.quantity;
    for (let i = 0; i < this.clients.length; i++) {
      this.remainingQuantity -= this.clients[i].attributted;
    }
    console.log('Remaining quantity:', this.remainingQuantity);
  }

  onSplitInvoices() {
    console.log("heeeeeeeeeey")
    console.log(this.numberOfClients);
    this.clients = [];
    this.remainingQuantity = 0;

    const itemsPerClient = Math.floor(this.data.quantity / this.numberOfClients);
    const remainder = this.data.quantity % this.numberOfClients;

    for (let i = 0; i < this.numberOfClients; i++) {
      const quantity = i < remainder ? itemsPerClient + 1 : itemsPerClient;
      const totalAmount = quantity * this.data.unit_price;
      this.clients.push({
        clientNumber: i + 1,
        quantity: quantity,
        unitPrice: this.data.unit_price,
        totalAmount: totalAmount
      });
    }

    this.remainingQuantity = this.data.quantity - this.clients.reduce((total, client) => total + client.quantity, 0);
  
  }

  onSaveInvoices(id:number, clients: any) {
    // Update the original invoice with the details for the first client
    // const firstClient = this.clients[0];
    // const originalInvoice = {
    //   ...this.data,
    //   // quantity: firstClient.quantity,
    //   quantity: this.remainingQuantity,
    //   total_price: this.data.unit_price * this.remainingQuantity
    // };

    // Create a new invoice for each additional client

    for (let i = 0; i < this.clients.length; i++) {
      const client = this.clients[i];
      // const item = this.data.item_id
      const itm= {
        item_id: this.data.item_id,
        quantity: client.attributted,
      }
      this.selectedItems.push(itm);

      // const {item_id, quantity} = this.selectedItems
      const newInvoice = {
        customer_name: 'Client'+ client.clientNumber,
        items: this.selectedItems
        
        
      };
      // const inv = {items: newInvoice}
      this.selectedInvoices.push(newInvoice);
      console.log("invoiceeeee split price", this.selectedInvoices);
      
    }
    const arrayClients = {clients: this.selectedInvoices}
    console.log("clients with their consumption", arrayClients);
    this._invoicesService.splitInvoice(id, arrayClients).subscribe();

  }

  onClose() {
    this.dialogRef.close()
  }

  onUpdateData(data: any): void {
    const id = data.id
    this._invoicesService.eupdateInvoice(data, id).subscribe(invoice => {
      console.log(invoice);
    });
  } 
}
