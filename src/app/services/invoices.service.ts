import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Item } from '../shared/item';
import { Invoice } from '../shared/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private baseUrl = "http://localhost:5001/";
  constructor(private _http: HttpClient) {
  }

  getItemsList() {
    return this._http.get(`${this.baseUrl}items`);
  }

  addItems(data:Item): Observable<any> {
    return this._http.post(`${this.baseUrl}items`, data);
  }

  // PUT
  UpdateItem(id:number, data:any): Observable<any> {
    return this._http.put<Item>(`${this.baseUrl}item/${id}`,
        JSON.stringify(data),
      
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  DeleteItem(id:number) {
    return this._http
      .delete<Item>(this.baseUrl + '/items/' + id,)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  //-------------------------/INVOICES/---------------------------------------

  getInvoicesList() {
    return this._http.get(`${this.baseUrl}invoices`);
  }

  getInvoicesDetails(id:number) {
    return this._http.get(`${this.baseUrl}invoices/${id =7}`);
  }

  eupdateInvoice(id: number, invoice: any) {
    return this._http.get(`${this.baseUrl}invoices/: id, invoice`);
  }

  addInvoices(data:Invoice): Observable<any> {
    return this._http.post(`${this.baseUrl}invoices`, data);
  }

  deleteInvoice(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}invoices/${id}`);
  }

  getInvoicesItemsList() {
    return this._http.get(`${this.baseUrl}invoices_items`);
  }

  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });


  }
}
