import { Component, NgZone, OnInit } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../shared/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemForm: FormGroup
  items: any;
  invoices: any;
  invoices_items:any;
  constructor(
    public _fb: FormBuilder,
    private _invoicesService: InvoicesService,
    public InvoicesService: InvoicesService
  ) {
    this.itemForm = this._fb.group({
      item_name: "Skol",
      sale_price: 0 
    });
  } 

  ngOnInit(): void {
    this._invoicesService.getItemsList().subscribe({
      next: (res:any) => {
        console.log(res)
        this.items = res;
      }
    })

    this._invoicesService.getInvoicesList().subscribe({
      next: (res:any) => {
        console.log(res)
        this.invoices = res;
      }
    })

    this._invoicesService.getInvoicesItemsList().subscribe({
      next: (res:any) => {
        console.log(res)
        this.invoices_items = res;
      }
    })
  }

  onSubmitItems() {
    if (this.itemForm.valid) {
      console.log('===>', this.itemForm.getRawValue());
      this._invoicesService.addItems(this.itemForm.value).subscribe((res) => {
        console.log('Item added!', res);;
        console.log('==>', this.itemForm.value);
      })
    }
  }
}

