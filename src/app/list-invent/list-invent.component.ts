import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-invent',
  templateUrl: './list-invent.component.html',
  styleUrls: ['./list-invent.component.css']
})
export class ListInventComponent implements OnInit {
  sell_items = []
  total = 0
  items = [
    {
      "category": "Fruits",
      "date_created": "Wed, 30 Oct 2019 18:31:00 GMT",
      "id": 5522,
      "name": "kiwi",
      "price": 2.13,
      "total_count": 50
    },
    {
      "category": "Grocery",
      "date_created": "Wed, 30 Oct 2019 21:00:00 GMT",
      "id": 10249,
      "name": "milk",
      "price": 0.98,
      "total_count": 40
    },
    {
      "category": "Beauty",
      "date_created": "Wed, 30 Oct 2019 21:01:00 GMT",
      "id": 24082,
      "name": "shampoo",
      "price": 3.5,
      "total_count": 12
    },
    {
      "category": "Grocery",
      "date_created": "Wed, 30 Oct 2019 21:01:00 GMT",
      "id": 80864,
      "name": "honey",
      "price": 5.6,
      "total_count": 25
    },
    {
      "category": "Grocery",
      "date_created": "Wed, 30 Oct 2019 18:31:00 GMT",
      "id": 81555,
      "name": "milk",
      "price": 1.5,
      "total_count": 10
    },
    {
      "category": "Fruits",
      "date_created": "Wed, 30 Oct 2019 21:00:00 GMT",
      "id": 84369,
      "name": "pineapple",
      "price": 3.6,
      "total_count": 10
    },
    {
      "category": "Fruits",
      "date_created": "Wed, 30 Oct 2019 21:00:00 GMT",
      "id": 99263,
      "name": "banana",
      "price": 0.75,
      "total_count": 20
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  appendItem(id, item, price) {
    let new_entry=true;
    this.sell_items.forEach(element => {
      if(element.id===id){
        element.quantity+=1;
        new_entry=false;
      } 
    });
    if (new_entry){
      this.sell_items.push({ "id": id, "item": item, "price": price, "quantity": 1 });
    }
    this.total += price;
  }

  cancelOrder(){
    this.sell_items.splice(0,this.sell_items.length);
  }

  placeOrder(){
    console.log(this.sell_items);
    this.sell_items.splice(0,this.sell_items.length);
  }
}
