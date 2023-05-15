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
  detailsForm: FormGroup

  displayedColumns: string [] = ['ID', 'item_name', 'quantity', 'unit_price', 'total_price'];
  dataSource!: MatTableDataSource<any>

  items: any;
  invoices: any;
  invoiceDetails: any;

  constructor(
    private _fb: FormBuilder,
    private _invoicesService: InvoicesService,
    // public _dialogRef: MatDialogRef<ActiveInvoiceComponent>,
    // private _dialogRef: DialogRef<ActiveInvoiceComponent>
    // @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {
    this.detailsForm = this._fb.group({
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
