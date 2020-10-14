import { Injectable } from '@angular/core';
import {ItemCount} from './shopping-cart/item-count';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/user';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getShoppingCart(): Observable<ItemCount[]> {
    return this.http.get<ItemCount[]>(`${this.userUrl}/shopping-cart`);
  }

  deleteItemCount(itemCount: ItemCount | number): Observable<ItemCount[]> {
    const id = typeof itemCount === 'number' ? itemCount : itemCount.item.id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }
}
