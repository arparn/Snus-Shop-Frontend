import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ItemSearchComponent } from './item-search/item-search.component';
import { CommentsComponent } from './comments/comments.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    ItemSearchComponent,
    CommentsComponent,
    WishlistComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),*/
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
