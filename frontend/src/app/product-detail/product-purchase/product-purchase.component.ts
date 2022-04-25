import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


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
  amountList: string[] = Array.from({length: 10}, (_, i) => i + 1).map(i => i.toString());
  selectedAmount: string = "";

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    let items = JSON.parse(window.sessionStorage.getItem("products"))
    this.productId = this.route.snapshot.queryParams.productId
    this.item = items.find(item => item.id == this.productId);
  }

  goBack() {
    this.location.back();
  }

  purchase() {
    if (this.agreements && this.selectedAmount) {
      Swal.fire({ title: "Cargando", allowOutsideClick: false });
      Swal.showLoading();
      setTimeout(() => {
        Swal.close();
        Swal.fire({ title: "Compra realizada exitosamente", allowOutsideClick: false, icon: "success", timer: 2000, showConfirmButton: false }).then(() => {
          let purchases = window.sessionStorage.getItem("purchases") ? JSON.parse(window.sessionStorage.getItem("purchases")) : [];
          let items = JSON.parse(window.sessionStorage.getItem("products"))
          let item = items.find(item => item.id == this.productId);
          item.id = purchases.length + 1;
          item.user = window.sessionStorage.getItem("user");
          item.timestamp = ("0" + new Date().getDate()).slice(-2) + "-" + ("0"+(new Date().getMonth()+1)).slice(-2) + "-" +
          new Date().getFullYear() + " " + ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2);
          item.amount = this.selectedAmount;
          purchases.push(item);
          window.sessionStorage.setItem("purchases", JSON.stringify(purchases));
          this.router.navigate(['/'])
        })
      }, 4000)
    } else {
      Swal.fire({ title: "Por favor complete el formulario", allowOutsideClick: false, icon: 'warning' });
    }
  }



}
