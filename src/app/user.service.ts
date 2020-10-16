import { Injectable } from '@angular/core';
import {ItemCount} from './shopping-cart/item-count';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Item } from './items/item';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/user';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addToWishlist(id: number): Observable<Item> {
        return this.http.post<Item>(`${this.userUrl}/wishList`, id, this.httpOptions);
  }

  addToShoppingCart(id: number): Observable<Item> {
      const url = `${this.userUrl}/shopping-cart`;
      return this.http.post<Item>(url, id, this.httpOptions);
  }

  getShoppingCart(): Observable<ItemCount[]> {
    return this.http.get<ItemCount[]>(`${this.userUrl}/shopping-cart`);
  }

  getWishlist(): Observable<Item[]> {
    return this.http.get<Item[]>(this.userUrl);
  }

  deleteItemCount(itemCount: ItemCount | number): Observable<ItemCount[]> {
    const id = typeof itemCount === 'number' ? itemCount : itemCount.item.id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }

  deleteFromWishList(id: number): Observable<Item[]> {
    const url = `${this.userUrl}/${id}/deleteWish`;
    return this.http.delete<Item[]>(url, this.httpOptions);
  }

  clearShoppingCart(): Observable<ItemCount[]> {
    const url = `${this.userUrl}/clear`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }
}
