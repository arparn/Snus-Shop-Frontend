import { Component, OnInit } from '@angular/core';
import {Item} from "./item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  item: Item = {
    url: "/assets/images/odens.png",
    name: "Oden's",
    strength: 5,
    rating: 4,
    price: 5.60,
    id: 1,
    description: "Good Snus"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
