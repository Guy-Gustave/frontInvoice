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
  @Input() invo: any;
  @Output() close = new EventEmitter<void>();
  @Output() editInvoice = new EventEmitter<any>();
  @Output() itemQuantityChanged = new EventEmitter<any>();
  customer_name!: string;
  quantity: number = 1;
  // details: any;
  el = { item_name: 'Item 1', sale_price: 10 };
  editMode = false;
  editIndex!: number;
  invoiceForm: FormGroup;

  // items: any;
  invoices: any;
  details: any;

  selectedItems: any[] = [];
  // invoice: any = {
  //   items: [],
  //   total: 0
  // };


  updatedItems: any[] = [];
  item_name: any;
  sale_price: any;

  constructor(
    public _fb: FormBuilder,
    // private dialog: MatDialog,

    private _invoicesService: InvoicesService, public dialog: MatDialog
  ) { 
    this.invoiceForm = this._fb.group({
      quantity: 1,
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

  }

  onGetInvoices() {
    this._invoicesService.getInvoicesList().subscribe({
      next: (res: any) => {
        console.log("inv from api", res);
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


  onSubmit() {
    // Submit data to backend and create invoice
    
    const customerName = this.invoiceForm.value.customer_name;
    console.log("object");
    const dataI = {
      customer_name: customerName,
      items: this.invo.Items
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
      width: '1200px',
      data: invoice
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

//   onItemQuantityChanged(item: any, quantity: number) {
//   item.quantity   = this.invoiceForm.value.quantity;;
//   item.total_amount = item.quantity * item.sale_price;
//   // this.onItemClicked(item);
// }

onItemQuantityChanged(quantity: number) {
  this.item.quantity = quantity;
  this.item.total_amount = quantity * this.item.sale_price;
  this.itemQuantityChanged.emit(this.item);
}

  increment() {
    this.quantity++;
  }
  
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
