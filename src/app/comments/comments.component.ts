import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './comment';
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  user: User;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getComments();
    this.user = this.authenticationService.CurrentUserValue;
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
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }

  deleteComment(commId: number): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.deleteCommentAdm(id, commId).subscribe(comments => this.comments = comments);
  }
}
