import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExcelService } from 'app/core/services/excel.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly excelService: ExcelService,
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
  }

  async downloadReport() {
    let data: any = await this.httpClient.get(`${environment.baseURL}/purchasedProduct/getAll`).toPromise();
    if (data) {
      let collection = [];
      data.forEach(item => {
        let element = {
          productId: item.product.id,
          name: item.product.name,
          description: item.product.description,
          imageURL: item.product.imageURL,
          price: item.product.price,
          stock: item.product.stock,
          freeShipping: item.product.freeShipping,
          tags: item.product.tags,
          saleId: item.sale.user.email,
          firstName: item.sale.user.firstName,
          lastName: item.sale.user.lastName,
          email: item.sale.user.email,
          username: item.sale.user.username,
          document: item.sale.user.document,
          roleId: item.sale.user.role.id,
          role: item.sale.user.role.name,
          documentTypeId: item.sale.user.documentType.id,
          documentType: item.sale.user.documentType.name,
          totalPrice: item.sale.totalPrice
        }
        collection.push(element);
      });
      this.excelService.exportAsExcelFile((collection), 'Reporte_Ventas');
    } else {
      Swal.fire({
        title: 'No hay datos para exportar',
        text: '',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
}