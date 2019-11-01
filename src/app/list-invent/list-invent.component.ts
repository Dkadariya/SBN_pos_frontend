import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-list-invent',
  templateUrl: './list-invent.component.html',
  styleUrls: ['./list-invent.component.css']
})
export class ListInventComponent implements OnInit {
  sell_items = [];
  total = 0;
  items: any = [];

  // injecting the service  dependency into class through constructor
  constructor(private invent: InventoryService) { }

  // component OnInit lifecycle hook
  ngOnInit() {
    // load the item list during the initialization of the component
    this.invent.list_all().subscribe(data => {
      this.items = data;
    });
  }

  // function to add item to sell list
  appendItem(id, item, price) {
    let new_entry = true;
    // if item already in the list, just increament its quantity value
    this.sell_items.forEach(element => {
      if (element.id === id) {
        element.quantity += 1;
        new_entry = false;
      }
    });

    // else if item is new in the list, add the item entry to the list
    if (new_entry) {
      this.sell_items.push({ "id": id, "item": item, "price": price, "quantity": 1 });
    }
    this.total += price;
  }

  //  function to clear the sell item list if order is cancelled
  cancelOrder() {
    this.sell_items.splice(0, this.sell_items.length);
  }

  //  function to update the item in the sercer database after the sell.
  placeOrder() {
    console.log(this.sell_items);
    this.invent.updateItems(this.sell_items).subscribe();
    this.sell_items.splice(0, this.sell_items.length);

    setTimeout(() => { this.refresh(); }, 100);
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
}
