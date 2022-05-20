import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products
  loaded: Boolean = false
  username: string;
  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
  ) { }

  async ngOnInit() {
    let products = await this.httpClient.get(`${environment.baseURL}/product/getAll`).toPromise()
    if (products) {
      this.products = products;
      this.loaded = true;
    }
  }

  parseName(title) {
    return title.length <= 13 ? title : title.substring(0, 10) + "..."
  }

  async goToProduct() {
    await this.router.navigate(['/product/detail', {productId: '123123'}]);
  }

}
