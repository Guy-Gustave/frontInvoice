import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private itemsUrl = "http://localhost:5001/items";
  constructor(private http: HttpClient) {
  }

  getItemsList() {
    return this.http.get(`${this.itemsUrl}`);
  }
}
