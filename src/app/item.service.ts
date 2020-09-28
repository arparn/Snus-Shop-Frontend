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
    // TODO: send the message _after_ fetching the items
    this.messageService.add('ItemService: fetched items');
    return of(ITEMS);
  }

  constructor(private messageService: MessageService) { }
}
