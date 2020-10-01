import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from "./items/item";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {url: "/assets/images/odens.png", name: "Oden's", strength: 5, rating: 4, price: 5.60, id: 1, description: "Good Snus"},
      {url: "/assets/images/thunder.png", name: "Thunder", strength: 4, rating: 4.2, price: 7.20, id: 2, description: "Good Snus"},
      {url: "/assets/images/siberia.png", name: "Siberia", strength: 5, rating: 3.8, price: 4.80, id: 3, description: "Good Snus"},
      {url: "/assets/images/knox.png", name: "KNOX", strength: 3, rating: 4.6, price: 6.00, id: 4, description: "Good Snus"},
      {url: "/assets/images/skruf.png", name: "Skruf", strength: 4, rating: 3.7, price: 4.99, id: 5, description: "Good Snus"},
    ];
    return {items};
  }

  // Overrides the genId method to ensure that an item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}
