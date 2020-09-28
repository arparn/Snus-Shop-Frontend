import { Injectable } from '@angular/core';
import { Item } from "./items/item";
import { ITEMS } from "./items/items-mock";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  getItems(): Observable<Item[]> {
    return of(ITEMS);
  }

  constructor() { }
}
