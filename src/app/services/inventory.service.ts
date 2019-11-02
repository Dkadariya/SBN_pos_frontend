import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }
  // endpoint URLs. Updated these URLs to you custom URLs if you are not running default POS server. 
  private addUrl = 'http://knoaid.online:5000/item';
  private listUrl= 'http://knoaid.online:5000/get_items';
  private updateUrl = 'http://knoaid.online:5000/update_item';
  private logUrl= 'http://knoaid.online:5000/log_sale';


// service method to send item to the server through API.
  addItem(item_details) {
    // creating a form object to pass form data alog with HTTP request.
    const formData = new FormData();
    formData.append('details', JSON.stringify(item_details) );
    // making a http PUt request and returning an Observable
    return this._http.put(this.addUrl, formData);
  }
// service method to get list of all item from server by making a HTTP GET API call
  list_all(){
    return this._http.get(this.listUrl);
  }
// service method to send item details to be updated to theserver
  updateItems(sold) {
    // creating form object and adding data to  be sent
    const formData = new FormData();
    formData.append('sold', JSON.stringify(sold) );
    // making HTTP POST call
    return this._http.post(this.updateUrl, formData);
  }

  // service method to send finalized order details to server so as to log it into a file.
  log_order(data){
    // creating form object and adding data to  be sent
    const fData = new FormData();
    fData.append('order_details', JSON.stringify(data) );
    // making HTTP PUT call
    return this._http.put(this.logUrl, fData);
  }

}
