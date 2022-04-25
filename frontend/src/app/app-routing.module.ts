import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppComponent } from './app.component';
import { ProductPurchaseComponent } from './product-detail/product-purchase/product-purchase.component';
import { AdminComponent } from './admin/admin.component';
import { PurchasesComponent } from './purchases/purchases.component';

const components = [
  LoginComponent,
];

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'product/detail', component: ProductDetailComponent },
  { path: 'product/purchase', component: ProductPurchaseComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'purchases', component: PurchasesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

