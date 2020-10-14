import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../items/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService} from '../item.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: Item;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private location: Location,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  addToShoppingCart(): void {
    this.itemService.addToShoppingCart(this.item.id)
      .subscribe(item => this.item = item);
  }

  addToWishlist(): void {
    this.itemService.addToWishlist(this.item.id)
          .subscribe(item => this.item = item);
  }
}
