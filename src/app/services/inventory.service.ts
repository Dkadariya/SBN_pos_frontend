import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }
  private addUrl = 'http://knoaid.online:5000/item';
  private listUrl= 'http://knoaid.online:5000/get_items';
  private updateUrl = 'http://knoaid.online:5000/update_item';
  private logUrl= 'http://knoaid.online:5000/log_sale';
  addItem(item_details) {
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // const params = new HttpParams().set('details',"{'id':10}");
    // const param = new HttpParams().set('details', item_details);
    const formData = new FormData();
    formData.append('details', JSON.stringify(item_details) );
    return this._http.put(this.addUrl, formData);
  }

  list_all(){
    return this._http.get(this.listUrl);
  }

  updateItems(sold) {
    const formData = new FormData();
    formData.append('sold', JSON.stringify(sold) );
    return this._http.post(this.updateUrl, formData);
  }

  log_order(data){
    const fData = new FormData();
    fData.append('order_details', JSON.stringify(data) );
    return this._http.put(this.logUrl, fData);
  }

}
