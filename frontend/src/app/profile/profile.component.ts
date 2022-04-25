import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {
    let loggedIn = window.sessionStorage.getItem("user");
    let users = JSON.parse(window.sessionStorage.getItem("users"));
    let user = users.find(user => user.username == loggedIn);
    user.password1 = user.password;
    user.password2 = user.password;
    delete user.password;
    this.userFormComponent.assignUserForm(user);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {

  }

  updateUser() {
    let newUser = this.userFormComponent.userData.value
    if (this.userFormComponent.userData.valid) {
      if (this.userFormComponent.userData.value.password1 == this.userFormComponent.userData.value.password2) {
        let users = window.sessionStorage.getItem("users") ? JSON.parse(window.sessionStorage.getItem("users")) : [];
        if (users.find(user => ((user.username == newUser.username) || (user.email == newUser.email)) && (user.id != newUser.id))) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya existe',
            allowOutsideClick: false
          });
        } else {
          Swal.fire({ title: 'Está seguro de actualizar su perfil?', icon: 'warning', showCancelButton: true, allowOutsideClick: false }).then((result) => {
            if (result.isConfirmed) {
              Swal.showLoading();
              newUser.password = this.userFormComponent.userData.value.password1
              delete newUser.password1
              delete newUser.password2
              let oldUserIndex = users.findIndex(user => user.id == newUser.id);
              users[oldUserIndex] = newUser;
              window.sessionStorage.setItem("users", JSON.stringify(users));
              window.sessionStorage.setItem("user", newUser.username);
              Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado exitosamente',
                allowOutsideClick: false,
                timer: 2000,
                showConfirmButton: false
              }).then(() => {
                this.router.navigate([''])
                  .then(() => {
                    window.location.reload();
                  });
              })
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseñas no coinciden',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario incompleto',
        allowOutsideClick: false
      });
    }
  }
}
