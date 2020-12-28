import { Injectable } from '@angular/core';
import {ItemCount} from './shopping-cart/item-count';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Item } from './items/item';
import {UserPassword} from './user-password';
import {User} from "./user";
import {Info} from "./info";


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
  const obj = localStorage.getItem("currentUser");
    const jsonObj = JSON.parse(obj);
    const token = jsonObj.token;
        return this.http.post<Item>(`api/wishlist`, {id, token} as Info, this.httpOptions);
  }

  addToShoppingCart(id: number): Observable<Item> {
      const url = `api/cart`;
      const obj = localStorage.getItem("currentUser");
          const jsonObj = JSON.parse(obj);
          const token = jsonObj.token;
      return this.http.post<Item>(url, {id, token} as Info, this.httpOptions);
  }

  getShoppingCart(): Observable<ItemCount[]> {
  const obj = localStorage.getItem("currentUser");
    const jsonObj = JSON.parse(obj);
    const token = jsonObj.token;
    return this.http.post<ItemCount[]>(`api/cart/purchase`, token, this.httpOptions);
  }

  getWishlist(): Observable<Item[]> {
  const obj = localStorage.getItem("currentUser");
  const jsonObj = JSON.parse(obj);
  const token = jsonObj.token;
    return this.http.post<Item[]>(`api/wishlist/list`, token, this.httpOptions);
  }

  deleteItemCount(itemCount: ItemCount | number): Observable<ItemCount[]> {
    const id = typeof itemCount === 'number' ? itemCount : itemCount.item.id;
    const url = `api/cart/${id}`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }

  deleteFromWishList(id: number): Observable<Item[]> {
    const url = `api/wishlist/${id}/wish-list`;
    return this.http.delete<Item[]>(url, this.httpOptions);
  }

  clearShoppingCart(): Observable<ItemCount[]> {
    const url = `api/cart/shopping-cart`;
    return this.http.delete<ItemCount[]>(url, this.httpOptions);
  }

  register(userPassword: UserPassword): Observable<any> {
    return this.http.post<UserPassword>(`${this.userUrl}/register`, userPassword, this.httpOptions);
  }

  login(userPassword: UserPassword): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/login`, userPassword, this.httpOptions);
  }
}
