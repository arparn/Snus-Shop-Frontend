import { Component, OnInit } from '@angular/core';
import { ItemService} from "../item.service";
import {Item} from "./item";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  selectedItem: Item;

  onSelect (item: Item):void {
    this.selectedItem = item;
    this.messageService.add(`SnusComponent: Selected snus=${item.name}`);
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  constructor(private itemService: ItemService, private messageService: MessageService) { }

  ngOnInit() {
    this.getItems();
  }

}
