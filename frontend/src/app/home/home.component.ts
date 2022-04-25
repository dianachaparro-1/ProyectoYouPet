import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publicaciones
  loaded: Boolean = false
  username: string;
  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    if (window.sessionStorage.getItem("products")) {
      this.publicaciones = JSON.parse(window.sessionStorage.getItem("products"))
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
