import { Injectable } from '@angular/core';
import {ItemCount} from "./shopping-cart/item-count";
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/user';

  constructor(private http: HttpClient) { }

  getShoppingCart(): Observable<ItemCount[]> {
    return this.http.get<ItemCount[]>(`${this.userUrl}/shopping-cart`);
  }


}
