import { Component } from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: User;
  title = 'WolfSnus - Best snus shop in Estonia!';
  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.CurrentUserValue;
  }
}

