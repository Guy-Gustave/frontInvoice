import { Component } from '@angular/core';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  items:any;
  constructor(private service:InvoicesService) {}
  ngOnInit() {
    this.service.getItemsList().subscribe(res=>{
      this.items = res;
      console.log('==>', res);
    })
  } 


}
