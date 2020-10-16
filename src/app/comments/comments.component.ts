import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getComments(id).subscribe(comments => this.comments = comments);
  }

  addComment(firstName: string, lastName: string, comment: string): void{
    firstName = firstName.trim();
    lastName = lastName.trim();
    comment = comment.trim();
    if (!firstName && !lastName && !comment) {return; }
    const time = new Date();
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.addComment({firstName, lastName, comment, time} as Comment, id)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }

}
