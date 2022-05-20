import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit {

  periods = [{ label: "por día", id: 1 }, { label: "por mes", id: 2 }, { label: "por año", id: 3 }]
  shippingOptions = [{ label: "Envío gratis", id: 1 }, { label: "Acordar con comprador", id: 2 }]
  productId
  agreements: boolean = false
  selectedMethod = ""
  publicacion
  formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  item: any;
  amountList: string[] = Array.from({ length: 10 }, (_, i) => i + 1).map(i => i.toString());
  selectedAmount: string = "";

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.baseURL}/product/getId/${this.route.snapshot.queryParams.productId}`).subscribe({
      next: (data) => {
        this.item = data;
        this.productId = this.route.snapshot.queryParams.productId;
      }
    })
  }

  goBack() {
    this.location.back();
  }

  async purchase() {
    if (this.agreements && this.selectedAmount) {
      if (parseFloat(this.selectedAmount) <= this.item.stock) {
        Swal.fire({ title: "Cargando", allowOutsideClick: false });
        Swal.showLoading();
        let userResponse = await this.httpClient.get(`${environment.baseURL}/user/getUsername/${window.sessionStorage.getItem('user')}`).toPromise();
        let saleResponse = await this.httpClient.put(`${environment.baseURL}/sale/put`, { user: userResponse, date: new Date(), totalPrice: parseFloat(this.selectedAmount) * this.item.price }).toPromise();
        let purchasedProducts = await this.httpClient.put(`${environment.baseURL}/purchasedProduct/put`, { amount: parseFloat(this.selectedAmount), product: this.item, sale: saleResponse }).toPromise();
        this.item.stock -= parseInt(this.selectedAmount);
        let productUpdateResponse = await this.httpClient.put(`${environment.baseURL}/product/put`, this.item).toPromise();
        Swal.close();
        Swal.fire({ title: "Compra realizada exitosamente", allowOutsideClick: false, icon: "success", timer: 2000, showConfirmButton: false }).then(async () => {
          this.router.navigate(['/']);
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay suficiente stock',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({ title: "Por favor complete el formulario", allowOutsideClick: false, icon: 'warning' });
    }
  }
}
