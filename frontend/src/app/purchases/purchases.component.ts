import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let purchases = JSON.parse(window.sessionStorage.getItem('purchases'));
    purchases.filter(purchase => purchase.user == window.sessionStorage.getItem('user'))
    this.purchases = purchases;
  }

  async goBack() {
    await this.router.navigate(['login']);
  }

}
