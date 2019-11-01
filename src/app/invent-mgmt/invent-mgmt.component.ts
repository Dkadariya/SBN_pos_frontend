import { Component, OnInit,ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invent-mgmt',
  templateUrl: './invent-mgmt.component.html',
  styleUrls: ['./invent-mgmt.component.css']
})
export class InventMgmtComponent implements OnInit {
  @ViewChild('myForm',{static: false}) formValues;
  item = {};

  constructor(private invent: InventoryService) { }

  ngOnInit() {
    
  }
  
  addItem() {
    this.item["id"] = Math.floor(Math.random() * 100001) + 1000;
    this.item["created"] = moment().format("MM-DD-YYYY HH:mm");
    console.log(this.item);
    this.invent.addItem (this.item).subscribe(data => {console.log(data); 
      this.formValues.resetForm();
    });
  }

}
