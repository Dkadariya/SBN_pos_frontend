import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as moment from 'moment';


@Component({
  selector: 'app-list-invent',
  templateUrl: './list-invent.component.html',
  styleUrls: ['./list-invent.component.css']
})

export class ListInventComponent implements OnInit {
  // class variable initialization
  sell_items = [];
  total = 0;
  order_no = 0;
  items: any = [];
  err_msg = '';
  close_sale = {};

  // injecting the service dependency into class through constructor
  constructor(private invent: InventoryService) { }

  // component OnInit lifecycle hook
  ngOnInit() {
    // load the item list during the initialization of the component
    this.invent.list_all().subscribe(data => {
      this.items = data;
      console.log(data);
    });
  }

  // function to add item to sell list
  appendItem(id, item, price) {
    let new_entry = true;
    let available;
    // get total available quantity of the particular item
    this.items.forEach(element => {
      if (element.id === id) {
        available = element.total_count;
      }
    });
    // if new order started, generate a new order no.
    if (this.order_no === 0) {
      this.rand_order();
    }
    // if item already in the list and quantity is available, increament its quantity value
    this.sell_items.forEach(element => {
      if (element.id === id && element.quantity < available) {
        element.quantity += 1;
        this.total += price;
        new_entry = false;
      }
      else if (element.id === id && element.quantity >= available) {
        this.err_msg = "No more quantity available for this item";
        setTimeout(() => { this.err_msg = ''; }, 2300);
        new_entry = false;
      }
    });

    // else if item is new in the list, add the item entry to the list
    if (new_entry) {
      this.sell_items.push({ "id": id, "item": item, "price": price, "quantity": 1 });
      this.total += price;
    }
  }

  //  function to clear the sell item list if order is cancelled
  cancelOrder() {
    this.sell_items.splice(0, this.sell_items.length);
    this.total = 0;
    this.order_no = 0;
  }

  //  function to update the item in the server database after the sell.
  placeOrder() {
    // send the sold item details to server to update
    this.invent.updateItems(this.sell_items).subscribe();

    // writing Order JSON
    this.close_sale['Order No'] = "SBN".concat(this.order_no.toString());
    this.close_sale['Total'] = (this.total).toFixed(2);
    this.close_sale['Tax'] = ((this.total) * 0.075).toFixed(2);
    this.close_sale['Sub total'] = (this.total + ((this.total) * 0.075)).toFixed(2);
    this.sell_items.forEach((element, i) => {
      this.close_sale['item'.concat(i.toString())] = element;
    });
    this.close_sale['timestamp'] = moment().format("MM-DD-YYYY HH:mm");

    // log the  Order JSON to file in server
    this.invent.log_order(this.close_sale).subscribe();

    // resetting the POS data fields
    this.sell_items.splice(0, this.sell_items.length);
    this.total = 0;
    this.order_no = 0;



    // custom tost to dispaly order complete message
    setTimeout(() => { this.refresh(); }, 100);

    this.err_msg = "Sale completed! Odrer detail committed to the file.";
    setTimeout(() => { this.err_msg = ''; }, 2300);
  }

  // call this function to get the fresh item lsit
  refresh() {
    this.invent.list_all().subscribe(data => {
      this.items = data;
    });
  }

  // function to increament quantity by 1.
  increment(id) {
    let available;
    // get total available quantity of the particular item
    this.items.forEach(element => {
      if (element.id === id) {
        available = element.total_count;
      }
    });
    // iterate through the list and update the item based on ID
    this.sell_items.forEach(element => {
      // increament the item only if the quantity is available and Id match is found 
      if (element.id === id && element.quantity < available) {
        element.quantity += 1;
        this.total += element.price;
      }
      else if (element.id === id && element.quantity >= available) {
        this.err_msg = "No more quantity available for this item";
        setTimeout(() => { this.err_msg = ''; }, 2300);
      }
    });
  }

  // function to decrement quantity by 1.
  decrement(id) {
    console.log(id);
    this.sell_items.forEach((element, i) => {
      // search for item based on ID and reduce the quantity by 1.
      if (element.id === id) {
        element.quantity -= 1;
        this.total -= element.price;
      }
      // if qutity is 0 remove item from the list
      if (element.quantity === 0) {
        this.sell_items.splice(i, 1);
      }
    });
  }
  // function to random generate order number 
  rand_order() {
    this.order_no = Math.floor(Math.random() * 100001) + 1000;
  }
}
