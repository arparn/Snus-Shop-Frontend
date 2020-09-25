import { Component, OnInit } from '@angular/core';
import {ITEMS} from "./items-mock";
import {Item} from "./item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items = ITEMS;
  selectedItem: Item;

  onSelect (item: Item):void {
    this.selectedItem = item;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
