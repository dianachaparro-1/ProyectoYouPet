import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgxCurrencyModule } from "ngx-currency";
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';



import { LoginTitleComponent } from './components/login-title/login-title.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PublicationItemComponent } from './components/publication-item/publication-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ProductPurchaseComponent } from './product-detail/product-purchase/product-purchase.component';
import { PublicationItemHorizontalComponent } from './components/publication-item-horizontal/publication-item-horizontal.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ExcelService } from './core/services/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    PublicationItemComponent,
    ProductDetailComponent,
    LoginTitleComponent,
    DropdownMenuComponent,
    UserFormComponent,
    ProfileComponent,
    AdminComponent,
    ProductPurchaseComponent,
    PublicationItemHorizontalComponent,
    PurchasesComponent,
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgpImagePickerModule,
    MatChipsModule,
    MatIconModule,
    NgxCurrencyModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
