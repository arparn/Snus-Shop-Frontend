import { Injectable } from '@angular/core';
import { Item } from './items/item';
import { Comment } from './comments/comment';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  /* GET items whose name contains search term */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      return of([]);  // if not search term, return empty item array.
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?query=${term}`);
  }

  /**--SORTING--*/

  getByRatingMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?filter=rating`);
  }

  getByStrengthMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?filter=strength`);
  }

  getByStrengthMin(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?filter=strength&direction=MIN`);
  }

  getByPriceMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?filter=price`);
  }

  getByPriceMin(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/?filter=price&direction=MIN`);
  }

  /**--END OF SORTING--*/

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`api/comment/${(id)}/comments`);
  }

  addComment(comment: Comment, id: number): Observable<Comment> {
    const url = `api/comment/${id}`;
    return this.http.post<Comment>(url, comment, this.httpOptions);
  }

  grade(id: number, rating: number): Observable<any> {
    const url = `${this.itemsUrl}/${id}/rating`;
    return this.http.post<number>(url, rating, this.httpOptions);
  }

  changePrice(id: number, price: number): Observable<any> {
    const url = `${this.itemsUrl}/${id}/price`;
    return this.http.post(url, price, this.httpOptions);
  }

  changeDescription(id: number, text: string): Observable<any> {
    const url = `${this.itemsUrl}/${id}/description`;
    return this.http.post(url, text, this.httpOptions);
  }
}
