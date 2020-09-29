import { Injectable } from '@angular/core';
import { Item } from "./items/item";
import { ITEMS } from "./items/items-mock";
import { Observable, of } from 'rxjs';
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  getItems(): Observable<Item[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('ItemService: fetched Items');
    return of(ITEMS);
  }

  getItem(id: number): Observable<Item> {
    // TODO: send the message _after_ fetching the items
    this.messageService.add(`ItemService: fetched item id=${id}`);
    return of(ITEMS.find(item => item.id === id));
  }

  constructor(private messageService: MessageService) { }
}
