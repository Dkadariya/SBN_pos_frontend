import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invent-mgmt',
  templateUrl: './invent-mgmt.component.html',
  styleUrls: ['./invent-mgmt.component.css']
})
export class InventMgmtComponent implements OnInit {
  // getting the form element as a child of the view
  @ViewChild('myForm', { static: false }) formValues;
  item = {};
  //  injecting class dependency through constructor
  constructor(private invent: InventoryService) { }

  ngOnInit() {

  }
  // function to pack the item details and send to server through service method
  addItem() {
    // assigning randomly generated ID to Items
    this.item["id"] = Math.floor(Math.random() * 100001) + 1000;
    // assign current timestamp as creation timestamp
    this.item["created"] = moment().format("MM-DD-YYYY HH:mm");

    // pass the JSON packet to service addItem method
    this.invent.addItem(this.item).subscribe(data => {
      this.formValues.resetForm();
    });
  }

}
