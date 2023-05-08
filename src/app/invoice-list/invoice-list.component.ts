import { Component } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
  invoiceForm: FormGroup

  invoices: any;

  constructor(
    public _fb: FormBuilder,
    private _invoicesService: InvoicesService) {
    this.invoiceForm = this._fb.group({
      customer_name: "",
      total_amount: 0
    });
  }

  ngOnInit(): void {
    this._invoicesService.getInvoicesList().subscribe({
      next: (res: any) => {
        console.log(res)
        this.invoices = res.data;
      }
    })
  }

  editInvoice(data: any): void {
    console.log('hello!', data)
  }

  onSubmitInvoices() {
    if (this.invoiceForm.valid) {
      console.log('===>', this.invoiceForm.getRawValue());
      this._invoicesService.addInvoices(this.invoiceForm.value).subscribe((res) => {
        console.log('Item added!', res);;
        console.log('==>', this.invoiceForm.value);
      })
    }
  }


  // openModal(){
  //   const modelDiv = Document.getElementById("modal");
  // }

}
