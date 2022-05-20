import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { UserFormComponent } from 'app/components/user-form/user-form.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;
  userId: string;
  role: any;

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private changeDetector: ChangeDetectorRef,
    private readonly httpClient: HttpClient
  ) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {
    let loggedIn = window.sessionStorage.getItem("user");
    this.httpClient.get(`${environment.baseURL}/user/getUsername/${loggedIn}`).subscribe({
      next: (user: any) => {
        user.password1 = "sample";
        user.password2 = "sample";
        this.userId = user.id;
        this.role = user.role;
        delete user.password;
        delete user.role;
        this.userFormComponent.assignUserForm(user);
      }
    })
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {

  }

  async updateUser() {
    Swal.showLoading();
    Swal.fire()
    let newUser = this.userFormComponent.userData.value
    if (this.userFormComponent.userData.valid) {
      if (this.userFormComponent.userData.value.password1 == this.userFormComponent.userData.value.password2) {
        if (!newUser.documentType.id) {
          if (newUser.password1 != "sample") {
            newUser.documentType = JSON.parse(newUser.documentType);
            newUser.id = this.userId;
            newUser.role = this.role;
            delete newUser.password2;
            newUser.password = this.userFormComponent.userData.value.password1;
            delete newUser.password1;
            try {
              await this.httpClient.patch(`${environment.baseURL}/user/update`, newUser).toPromise();
              Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado exitosamente',
                allowOutsideClick: false,
                showConfirmButton: true
              }).then(() => {
                this.router.navigate(['/']);
              })
            } catch (e) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en la actualización del usuario',
                allowOutsideClick: false
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor confirme la contraseña',
              allowOutsideClick: false
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe completar el formulario',
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
        text: 'Formulario incompleto',
        allowOutsideClick: false
      });
    }
  }
}
