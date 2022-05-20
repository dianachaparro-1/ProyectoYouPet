import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { ImagePickerConf } from 'ngp-image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  shippingOptions = [{ label: "Envío gratis", id: 1 }, { label: "Acordar con comprador", id: 2 }]
  tags = []
  loadedImages = []
  selectedPeriod
  selectedFreightPlan
  imagePickerConf1: ImagePickerConf = {
    borderRadius: "5px",
    language: "es",
    width: "400px",
    height: "300px",
  };
  imagePickerConf2: ImagePickerConf = {
    borderRadius: "5px",
    language: "es",
    width: "300px",
    height: "100px",
  };
  itemData: FormGroup
  userId: string
  fruits: string[] = ['Lemon'];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  owner: Boolean;
  autor: String;
  imageURL: String;
  action: String;
  rentBtnTitle: String;
  readOnly: boolean = false;

  constructor(
    private readonly location: Location,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {
    this.itemData = this.formBuilder.group({
      id: [''],
      imageURL: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
      freeShipping: [false],
      tags: [''],
      tag: [''],
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.mode == 1 || this.route.snapshot.queryParams.mode == 2) {
      this.httpClient.get(`${environment.baseURL}/product/getId/${this.route.snapshot.queryParams.productId}`).subscribe({
        next: (item: any) => {
          item.tag = null;
          this.tags = item.tags.replace(/[\[\]']+/g, '').split(",");
          this.imageURL = item.imageURL;
          this.itemData.setValue(item);
          if (this.route.snapshot.queryParams.mode == 1) {
            this.action = "update";
            this.rentBtnTitle = "Actualizar";
          } else {
            this.rentBtnTitle = "Comprar";
            this.readOnly = true;
          }
        }
      })
    } else if (this.route.snapshot.queryParams.mode == 0) {
      this.action = "create";
      this.rentBtnTitle = "Publicar";
    }
  }

  remove(etiqueta: string): void {
    const index = this.tags.indexOf(etiqueta);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    this.itemData.get("tag").reset()
  }

  goBack() {
    this.location.back();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  callFunction() {
    if (window.sessionStorage.getItem("role") == "admin") {
      if (this.action == "create") {
        this.uploadItem();
      } else {
        this.updateItem();
      }
    } else {
      this.purchaseItem();
    }
  }

  async uploadItem() {
    Swal.fire({ title: 'Cargando', allowOutsideClick: false });
    Swal.showLoading();
    this.itemData.get("imageURL").setValue(this.imageURL)
    this.itemData.get("tags").setValue(this.tags)
    this.markFormGroupTouched(this.itemData)
    if (this.itemData.valid && this.imageURL) {
      let item = this.itemData.value
      delete item.tag;
      item.tags = `[${item.tags.toString()}]`;
      try {
        let updateResponse = await this.httpClient.put(`${environment.baseURL}/product/put`, item).toPromise();
        Swal.close();
        Swal.fire({ title: 'Publicado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
          this.router.navigate(['/'])
        })
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido',
        allowOutsideClick: false
      });
    }
  }

  async updateItem() {
    Swal.fire({ title: 'Cargando', allowOutsideClick: false });
    Swal.showLoading();
    this.itemData.get("imageURL").setValue(this.imageURL)
    this.itemData.get("tags").setValue(this.tags)
    this.markFormGroupTouched(this.itemData)
    if (this.itemData.valid && this.imageURL) {
      let item = this.itemData.value
      delete item.tag;
      item.tags = `[${item.tags.toString()}]`;
      item.id = this.route.snapshot.queryParams.productId;
      try {
        let updateResponse = await this.httpClient.put(`${environment.baseURL}/product/put`, item).toPromise();
        Swal.close();
        Swal.fire({ title: 'Actualizado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
          this.router.navigate(['/'])
        })
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido',
        allowOutsideClick: false
      });
    }
  }

  purchaseItem() {
    if (window.sessionStorage.getItem("user")) {
      if (this.itemData.get("stock").value > 0) {
        this.router.navigate(["product/purchase"], { queryParams: { productId: this.itemData.value.id } });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay stock disponible',
          allowOutsideClick: false
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Debe iniciar sesión para comprar',
        allowOutsideClick: false
      });
    }
  }

  deleteItem() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.httpClient.delete(`${environment.baseURL}/product/delete/${this.route.snapshot.queryParams.productId}`).subscribe({
          next: (response) => {
            Swal.fire({ title: 'Eliminado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
              this.router.navigate(['/'])
            })
          }
        })
      }
    })
  }
}
