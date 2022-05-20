import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { environment } from 'environments/environment';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  async signup() {
    if (this.userFormComponent.userData.valid) {
      if (this.userFormComponent.userData.value.password1 == this.userFormComponent.userData.value.password2) {
        let user = this.userFormComponent.userData.value;
        user.documentType = JSON.parse(user.documentType);
        delete user.password2;
        delete user.id;
        user.password = this.userFormComponent.userData.value.password1;
        delete user.password1;
        try {
          await this.httpClient.post(`${environment.baseURL}/user/signup`, user).toPromise();
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            allowOutsideClick: false,
            showConfirmButton: true
          }).then(() => {
            this.router.navigate(['login']);
          })
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la creación del usuario',
            allowOutsideClick: false
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido',
        allowOutsideClick: false
      });
    }
  }


  async goBack() {
    await this.router.navigate(['login']);
  }

}
