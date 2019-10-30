import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }
  private addUrl = 'http://knoaid.online:5000/item';

  addItem(item_details) {
    console.log("please add item");
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // const params = new HttpParams().set('details',"{'id':10}");
    // const param = new HttpParams().set('details', item_details);
    const formData = new FormData();
    formData.append('details', JSON.stringify(item_details) );
    return this._http.put(this.addUrl, formData);
  }
}
