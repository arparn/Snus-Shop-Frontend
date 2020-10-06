import { Component, OnInit } from '@angular/core';
import { ItemService} from "../item.service";
import {Item} from "./item";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  filterForm = new FormGroup({
    snusFilter: new FormControl("allSnus"),
  });

  get fc() {
    return this.filterForm.controls;
  }

  filter(value: JSON): void{
    if (JSON.stringify(value).substr(15, 7) == "topSell") {
      this.getByRatingMax();
    } else if (JSON.stringify(value).substr(15, 7) == "allSnus") {
      this.getItems();
    } else if (JSON.stringify(value).substr(15, 7) == "maxStre") {
      this.getByStrengthMax();
    } else if (JSON.stringify(value).substr(15, 7) == "minStre") {
      this.getByStrengthMin()
    } else if (JSON.stringify(value).substr(15, 7) == "maxPric") {
      this.getByPriceMax()
    } else if (JSON.stringify(value).substr(15, 7) == "minPric") {
      this.getByPriceMin()
    }
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getByRatingMax(): void {
    this.itemService.getByRatingMax().subscribe(items => this.items = items);
  }

  getByStrengthMax(): void {
    this.itemService.getByStrengthMax().subscribe(items => this.items = items);
  }

  getByStrengthMin(): void {
    this.itemService.getByStrengthMin().subscribe(items => this.items = items);
  }

  getByPriceMax(): void {
    this.itemService.getByPriceMax().subscribe(items => this.items = items);
  }

  getByPriceMin(): void {
    this.itemService.getByPriceMin().subscribe(items => this.items = items);
  }
}
