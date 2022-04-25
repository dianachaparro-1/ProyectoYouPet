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
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  signup() {
    if (this.userFormComponent.userData.valid) {
      if (this.userFormComponent.userData.value.password1 == this.userFormComponent.userData.value.password2) {
        let users = window.sessionStorage.getItem("users") ? JSON.parse(window.sessionStorage.getItem("users")) : [];
        if (users.find(user => (user.username == this.userFormComponent.userData.value.username) || (user.email == this.userFormComponent.userData.value.email))) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya existe',
            allowOutsideClick: false
          });
        } else {
          let user = this.userFormComponent.userData.value;
          user.id = users.length + 1;
          delete user.password2;
          user.password = this.userFormComponent.userData.value.password1;
          delete user.password1;
          users.push(user);
          window.sessionStorage.setItem("users", JSON.stringify(users));
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            allowOutsideClick: false,
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['login']);
          })
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
