import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Input() showDropdownMenu: boolean = false;
  showAdmin: boolean = false;
  showClient: boolean = false;

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.showAdmin = window.sessionStorage.getItem('role') == 'admin' ? true : false;
    this.showClient = window.sessionStorage.getItem('role') == 'client' ? true : false;
  }

  async navigate(route) {
    this.showDropdownMenu = false;
    await this.router.navigate([route]);
  }

  async goTo(param) {
    if (param == 'logout') {
      Swal.fire({
        title: 'Desea cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.sessionStorage.removeItem('user');
          window.sessionStorage.removeItem('role');
          await this.router.navigate(['login']);
        } else {
          Swal.close();
        }
      })
    } else if (param == 'product/detail') {
      this.showDropdownMenu = false;
      this.router.navigate(['product/detail'], {
        queryParams: {
          mode: 0,
        }
      })
    } else {
      this.navigate(param);
    }
  }
}
