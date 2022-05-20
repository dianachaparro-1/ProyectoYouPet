import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.scss']
})
export class PublicationItemComponent implements OnInit {


  @Input() imageURL
  @Input() title
  @Input() price
  @Input() id
  formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  constructor(
    private readonly router: Router,
  ) { }

  async goToProduct() {
    if (window.sessionStorage.getItem("role") == "admin") {
      await this.router.navigate(['product/detail'], {
        queryParams: {
          mode: 1,
          productId: this.id,
        }
      })
    } else {
      await this.router.navigate(['product/detail'], {
        queryParams: {
          mode: 2,
          productId: this.id,
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
