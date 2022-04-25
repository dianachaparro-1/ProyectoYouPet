import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication-item-horizontal',
  templateUrl: './publication-item-horizontal.component.html',
  styleUrls: ['./publication-item-horizontal.component.scss']
})
export class PublicationItemHorizontalComponent implements OnInit {

  @Input() item;
  
  formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

}
