import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoicesService } from '../services/invoices.service';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-active-invoice',
  templateUrl: './active-invoice.component.html',
  styleUrls: ['./active-invoice.component.css'],
})
export class ActiveInvoiceComponent {
  invoiceForm: FormGroup

  items: any
  invoices: any;
  details: any

  selectedItems: any[] = [];

  displayedColumns: string [] = ['ID', 'item_name', 'quantity', 'unit_price', 'total_price'];
  dataSource!: MatTableDataSource<any>

  invoiceDetails: any;

  constructor(
    private _fb: FormBuilder,
    private _invoicesService: InvoicesService,
    
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

  onItemSelect() {
    const item = this.invoiceForm.value.item_name;
    // const d = this.items.find((item_id)=> item_name === item)
    const quantity = this.invoiceForm.value.quantity;
    const selectedItem = {
      item_id: item,
      quantity: quantity
    };
    console.log("===<>", selectedItem);
    this.selectedItems.push(selectedItem);
  }

  onSubmitInvoices() {
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
  }

  // onClose() {
  //   this._dialogRef.close()
  // }

  onUpdateData(data: any): void {
    const id = data.id
    this._invoicesService.eupdateInvoice(data, id).subscribe(invoice => {
      console.log(invoice);
    });
  } 
}
