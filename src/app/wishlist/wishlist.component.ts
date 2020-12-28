import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Item } from '../items/item';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private userService: UserService,
              private auth: AuthenticationService) { }

  itemsToRemember: Item[];

  ngOnInit(): void {
      this.getWishlist();
  }

  getWishlist(): void {
    this.userService.getWishlist().subscribe(itemsToRemember => this.itemsToRemember = itemsToRemember);
  }

  remove(item: Item, id: number): void {
    this.itemsToRemember = this.itemsToRemember.filter(h => h !== item);
    this.userService.deleteFromWishList(id).subscribe();
  }
}
