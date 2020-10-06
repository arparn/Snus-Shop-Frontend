import { Injectable } from '@angular/core';
import { Item } from "./items/item";
import { Observable, of } from 'rxjs';
import {MessageService} from "./message.service";
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api

  constructor( private http: HttpClient,
               private messageService: MessageService) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
      .pipe(
        tap(_ => this.log(`fetched item id=${id}`)),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  /* GET items whose name contains search term */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      return of([]);  // if not search term, return empty item array.
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?query=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found items matching "${term}"`) :
          this.log(`no items matching "${term}"`)),
        catchError(this.handleError<Item[]>('searchItems', []))
      );
  }

  getByRatingMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/ratingMax`)
      .pipe(
        tap(_ => this.log('filtered items')),
        catchError(this.handleError<Item[]>('getByRatingMax', []))
      );
  }

  getByStrengthMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/strengthMax`)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  getByStrengthMin(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/strengthMin`)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  getByPriceMax(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/priceMax`)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  getByPriceMin(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.itemsUrl}/priceMin`)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}
