import { Component, EventEmitter, Input, Output,Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { InvoicesService } from '../services/invoices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../shared/item';
import { ActiveInvoiceComponent } from '../active-invoice/active-invoice.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  [x: string]: any;
  @Input() item: any;
  @Output() close = new EventEmitter<void>();
  @Output() editInvoice = new EventEmitter<any>();
  customer_name!: string;
  quantity!: number;
  // details: any;
  el = { item_name: 'Item 1', sale_price: 10 };
  editMode = false;
  editIndex!: number;
  invoiceForm: FormGroup;

  // items: any;
  invoices: any;
  details: any;

  selectedItems: any[] = [];

  updatedItems: any[] = [];
  item_name: any;
  sale_price: any;

  constructor(
    public _fb: FormBuilder,
    // private dialog: MatDialog,

    private _invoicesService: InvoicesService, public dialog: MatDialog
  ) { 
    this.invoiceForm = this._fb.group({
      quantity: "",
      customer_name: "",
        item_name: "",
    });
  }

  ngOnInit(): void {
    this.onGetInvoices();
    if(this.details) {
      console.log("!!!!!!!!", this.details);
      this.item_name = this.details.item_name;
      this.sale_price = this.details.sale_price;
      this.quantity = this.details.quantity;
      this['total_amount'] = this.details.total_amount;
      this.customer_name = this.details.customer_name;
    }

    // this._invoicesService.getItemsList().subscribe({
    //   next: (res: any) => {
    //     console.log(res.data);
    //     this.items = res;
    //   },
    // });
  }

  onGetInvoices() {
    this._invoicesService.getInvoicesList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.invoices = res.data;
      },
    });
  }


  onItemSelect() {
    const id = this.item.id;
    // const d = this.items.find((item_id)=> item_name === item)
    const quantity = this.invoiceForm.value.quantity;
    const customerName = this.invoiceForm.value.customer_name;
    const selectedItem = {
      item_id: id,
      quantity: quantity,
    };
    const dataI = {
      customer_name: customerName,
      items: this.selectedItems
    }
    if (this.editMode) {
      this.invoices[this.editIndex] = dataI;
      this.editMode = false;
      // this.editIndex = null;
    } else {
      // this.invoices.push(dataI);
      this.selectedItems.push(selectedItem);
    }
    console.log('===<>', selectedItem);
    // this.invoiceForm.reset();
  
  }

  onItemchanged() {
    // const item = this.updateForm.value.item_name;
    // const d = this.items.find((item_id)=> item_name === item)
    // const quantity = this.updateForm.value.quantity;
    // const selectedItem = {
    //   item_id: item,
    //   quantity: quantity,
    // };
    // console.log('===<>', selectedItem);
    // this.updatedItems.push(selectedItem);
  }

  onSubmit() {
    // Submit data to backend and create invoice
    // ...

    
    const customerName = this.invoiceForm.value.customer_name;
    console.log("object");
    const dataI = {
      customer_name: customerName,
      items: this.selectedItems
    }
    console.log("data to submit",dataI);

      this._invoicesService.addInvoices(dataI).subscribe((res) => {
        console.log('Item added!', res);
      })

    // // Close the invoice form
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

  onEdit(invoice: any) {
    console.log(invoice);
    // Emit the edit event to open the edit invoice form
    this.editInvoice.emit(invoice);
    this.item_name = invoice.item_name;
    console.log("fffff", this.item_name);
    this.item = { item_name: invoice.item_name, sale_price: invoice.sale_price };
    this.quantity = invoice.quantity;
    this.customer_name = invoice.customer_name;

  }

  onCheckingInvoice(data: any) {
    console.log("=== invoice check", data.id);
    // this.details = []
    this._invoicesService.getInvoicesDetails(data.id).subscribe({
      next: (res: any) => {
        console.log('-------->>>>, res', res);
        this.details = []
        this.details = res.data;
      },
    });
    this.onGetInvoices()

    // const dialogRef = this.dialog.open(ActiveInvoiceComponent, {
    //   width: '1500px',
    //   data: this.details
    // });
  }

  onUpdateInvoices(data: any, id: number) {
    // if (this.updateForm.valid) {
    //   console.log('==>', this.updateForm.value);
    //   const customerName = this.updateForm.value.customer_name;

    //   const dataI = {
    //     customer_name: customerName,
    //     items: this.selectedItems,
    //   };
    //   console.log('data to submit', dataI);
    //   this._invoicesService.eupdateInvoice(id, dataI).subscribe((res) => {
    //     console.log('Item added!', res);
    //   });
    // }
  }

  ondeleteInvoices(data: any) {
    console.log('data to delete', data.id);
    this._invoicesService.deleteInvoice(data.id).subscribe((res) => {
      console.log('Item added!', res);
    });
    this.onGetInvoices();
  }

  openDialog(invoice: any) {
    const dialogRef = this.dialog.open(ActiveInvoiceComponent, {
      width: '1000px',
      data: invoice
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
