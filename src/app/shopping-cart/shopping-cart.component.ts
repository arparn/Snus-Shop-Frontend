import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ItemCount} from './item-count';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private userService: UserService) { }

  itemsToBuy: ItemCount[];

  ngOnInit(): void {
    this.getShoppingCart();
  }

  getShoppingCart(): void {
    this.userService.getShoppingCart().subscribe(itemsToBuy => this.itemsToBuy = itemsToBuy);
  }

  delete(itemCount: ItemCount): void {
    this.itemsToBuy = this.itemsToBuy.filter(h => h !== itemCount);
    this.userService.deleteItemCount(itemCount).subscribe(itemList => this.itemsToBuy = itemList);
  }

  deleteAll(): void{
    this.userService.clearShoppingCart().subscribe(cartList => this.itemsToBuy = cartList);
  }
}
