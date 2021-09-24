import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router";
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './services/auth.service';
import { NoAccessComponent } from './no-access/no-access.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthService] },
  { path: 'admin/LoginDetails', component: AdminLoginComponent, canActivate: [AuthService] },
  { path: 'admin/FoodTable', component: AdminPortalComponent, canActivate: [AuthService] },
  { path: 'noaccess', component: NoAccessComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
