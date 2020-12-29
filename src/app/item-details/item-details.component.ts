import { Component, OnInit} from '@angular/core';
import { Item } from '../items/item';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService} from '../item.service';
import {UserService} from '../user.service';
import {User} from '../user';
import {AuthenticationService} from "../authentication.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  user: User;
  item: Item;
  action: string = '';
  actionChanged: boolean = false;

  ratings = [1, 2, 3, 4, 5];


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private itemService: ItemService,
              private location: Location,
              private userService: UserService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.CurrentUserValue;
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
    this.userService.addToShoppingCart(this.item.id)
      .subscribe(item => this.item = item);
  }

  addToWishlist(): void {
    if (this.actionChanged){
      this.action = 'Add to';
      this.actionChanged = false;
      this.userService.deleteFromWishList(this.item.id).subscribe();
    }
    else
    {
      this.action = 'Remove from';
      this.actionChanged = true;
      this.userService.addToWishlist(this.item.id)
        .subscribe(item => this.item = item);
    }
  }

  grade(rating: string): void{
    this.itemService.grade(this.item.id, Number(rating)).subscribe(grade => this.item.rating = grade);
  }

  sendNewPrice(price: string): void {
    this.itemService.changePrice(this.item.id, price).subscribe(price => this.item.price = price);
    location.reload(true);
  }

  sendDescription(text: string): void {
    this.itemService.changeDescription(this.item.id, text).subscribe(desc => this.item.description = desc);
    location.reload(true);
  }
}
