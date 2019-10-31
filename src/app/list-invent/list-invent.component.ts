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
  constructor(private invent: InventoryService) {
    invent.list_all().subscribe(data => {
      this.items = data;
    });
  }

  ngOnInit() {
  }

  appendItem(id, item, price) {
    let new_entry = true;
    this.sell_items.forEach(element => {
      if (element.id === id) {
        element.quantity += 1;
        new_entry = false;
      }
    });
    if (new_entry) {
      this.sell_items.push({ "id": id, "item": item, "price": price, "quantity": 1 });
    }
    this.total += price;
  }

  cancelOrder() {
    this.sell_items.splice(0, this.sell_items.length);
  }

  placeOrder() {
    console.log(this.sell_items);
    this.invent.updateItems(this.sell_items).subscribe();
    this.sell_items.splice(0, this.sell_items.length);

    setTimeout(() => { this.refresh(); }, 10);
  }

  refresh() {
    this.invent.list_all().subscribe(data => {
      this.items = data;
    });
  }
}
