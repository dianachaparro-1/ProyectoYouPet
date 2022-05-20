import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

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
    private readonly httpClient: HttpClient
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
      try {
        let loginResponse:any = await this.httpClient.post(`${environment.baseURL}/login`, this.userData.value, {responseType: 'text'}).toPromise()
        window.sessionStorage.setItem("token", loginResponse);
        let userData:any = jwt_decode(loginResponse);
        await this.navigate(userData.sub, userData.Authorities.substring(userData.Authorities.indexOf("_") + 1).toLowerCase());
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales inválidas',
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
