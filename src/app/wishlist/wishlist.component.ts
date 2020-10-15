import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Item } from '../items/item';
import { ItemService} from '../item.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private userService: UserService, private itemService: ItemService) { }

  itemsToRemember: Item[];

  ngOnInit(): void {
      this.getWishlist();
  }

  getWishlist(): void {
      this.userService.getWishlist().subscribe(itemsToRemember => this.itemsToRemember = itemsToRemember);
  }

  remove(item: Item): void {
    this.userService.addToWishlist(item.id).subscribe(item => item = item);
    this.getWishlist();
  }


}
