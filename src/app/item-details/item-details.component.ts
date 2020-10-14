import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../items/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService} from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: Item;
  action: string = '';
  actionChanged: boolean = false;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private location: Location) { }

  ngOnInit(): void {
    this.getItem();
    this.action = 'Add to';
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
    if (this.actionChanged){
      this.action = 'Add to';
      this.actionChanged = false;
    }
    else
    {
      this.action = 'Remove from';
      this.actionChanged = true;
    }
    this.itemService.addToWishlist(this.item.id)
          .subscribe(item => this.item = item);
  }
}
