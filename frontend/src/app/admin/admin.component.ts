import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExcelService } from 'app/core/services/excel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly excelService: ExcelService
  ) { }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
  }

  async downloadReport() {
    if (window.sessionStorage.getItem("purchases")) {
      this.excelService.exportAsExcelFile(JSON.parse(window.sessionStorage.getItem("purchases")), 'Reporte_Ventas');     
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