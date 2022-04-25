import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {
    this.userData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
   })
}

  ngOnInit(): void {
  }

  async navigate(user, role) {
    setTimeout(async () => {
      Swal.close()
      window.sessionStorage.setItem('user', user);
      window.sessionStorage.setItem('role', role);
      await this.router.navigate(['/']);
    }, 1000)
  }

  async login() {
    if (this.userData.valid) {
      Swal.fire({title: "Cargando..", allowOutsideClick: false});
      Swal.showLoading();
      let users = window.sessionStorage.getItem("users") ? JSON.parse(window.sessionStorage.getItem("users")) : [];
      let user = users.find(user => (user.username == this.userData.value.username) && (user.password == this.userData.value.password));
      if (user) {
        await this.navigate(user.username, user.role);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El usuario no existe',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingreso inválido',
        allowOutsideClick: false
      });
    }
  }

  async signup() {
    await this.router.navigate(['signup']);
  }

}
