import { Component, EventEmitter, Input, Output,Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { InvoicesService } from '../services/invoices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../shared/item';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  @Input() item: any;
  @Output() close = new EventEmitter<void>();
  customer_name!: number;
  quantity!: number;
  invoiceForm: FormGroup;
  // updateForm: FormGroup;

  // items: any;
  invoices: any;
  details: any;

  selectedItems: any[] = [];

  updatedItems: any[] = [];

  constructor(
    public _fb: FormBuilder,
    // private dialog: MatDialog,

    private _invoicesService: InvoicesService
  ) { 
    this.invoiceForm = this._fb.group({
      quantity: "",
      customer_name: "",
        item_name: "",
    });
  }

  ngOnInit(): void {
    this.onGetInvoices();

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
    const selectedItem = {
      item_id: id,
      quantity: quantity,
    };
    console.log('===<>', selectedItem);
    this.selectedItems.push(selectedItem);
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
    if (this.invoiceForm.valid) {
      console.log('==>', this.invoiceForm.value);
      const customerName = this.invoiceForm.value.customer_name;
      
      const dataI = {
        customer_name: customerName,
        items: this.selectedItems
      }
      console.log("data to submit",dataI);
      this._invoicesService.addInvoices(dataI).subscribe((res) => {
        console.log('Item added!', res);
      })
    }

    // Close the invoice form
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

  openActiveInvoice(data: any) {
    this._invoicesService.getInvoicesDetails(data.id).subscribe({
      next: (res: any) => {
        console.log('-------->>>>, res', res);
        this.details = res.data;
      },
    });
    // const dialogRef = this.dialog.open(ActiveInvoiceComponent, {
    //   width: '1500px',
    //   data: this.details
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   res = this.details.data
    //   console.log("details", res);
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
}
