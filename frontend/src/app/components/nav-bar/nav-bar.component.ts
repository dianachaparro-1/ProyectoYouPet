import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title: string;
  subtitle: string;
  showDropdownMenu: boolean = false;
  loggedIn: boolean;
  @ViewChildren(DropdownMenuComponent) dropdownMenuComponent: DropdownMenuComponent;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (window.sessionStorage.getItem("user")) {
      this.title = `Hola, ${window.sessionStorage.getItem("user")}`;
      this.subtitle = "Perfil y Opciones";
      this.loggedIn = true;
    } else {
      this.title = "Hola"
      this.subtitle = "Iniciar sesión"
    }
  }

  async goTo() {
    if (this.loggedIn) {
      if (this.showDropdownMenu) {
        this.showDropdownMenu = false
      } else {
        this.showDropdownMenu = true
      }
    } else {
      await this.router.navigate(['login']);
    }
  }
}
