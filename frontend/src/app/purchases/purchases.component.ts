import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  purchases: any = [];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get(`${environment.baseURL}/product/getUsername/${window.sessionStorage.getItem("user")}`).subscribe({
      next: (purchases: any) => {
        this.purchases = purchases;
      }
    })
  }

  async goBack() {
    await this.router.navigate(['login']);
  }

}
