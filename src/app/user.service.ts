import { Injectable } from '@angular/core';
import {ItemCount} from './shopping-cart/item-count';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Item } from './items/item';
import {UserPassword} from './user-password';
import {User} from './user';
import {Info} from './info';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userUrl = 'api/user';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addToWishlist(id: number): Observable<Item> {
  return this.http.post<Item>(`api/wishlist`, id, this.httpOptions);
  }

  addToShoppingCart(id: number): Observable<Item> {
      const url = `api/cart`;
      return this.http.post<Item>(url, id, this.httpOptions);
  }

  getShoppingCart(): Observable<ItemCount[]> {
  return this.http.get<ItemCount[]>(`api/cart`);
  }

  getWishlist(): Observable<Item[]> {
  return this.http.get<Item[]>(`api/wishlist`);
  }

  deleteItemCount(itemCount: ItemCount | number): Observable<ItemCount[]> {
    const id = typeof itemCount === 'number' ? itemCount : itemCount.item.id;
    const url = `api/cart/${id}`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }

  deleteFromWishList(id: number): Observable<Item[]> {
    const url = `api/wishlist/${id}`;
    return this.http.delete<Item[]>(url, this.httpOptions);
  }

  clearShoppingCart(): Observable<ItemCount[]> {
    const url = `api/cart/shopping-cart`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }

  register(userPassword: UserPassword): Observable<any> {
    return this.http.post<UserPassword>(`${this.userUrl}/reg`, userPassword, this.httpOptions);
  }

  login(userPassword: UserPassword): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/log`, userPassword, this.httpOptions);
  }
}
