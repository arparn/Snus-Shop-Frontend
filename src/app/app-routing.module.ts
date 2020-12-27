import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { WishlistComponent } from './wishlist/wishlist.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RegisterComponent } from './register/register.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helper/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: ItemDetailsComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'items', component: ItemsComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
