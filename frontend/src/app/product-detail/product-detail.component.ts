import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { ImagePickerConf } from 'ngp-image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';

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
    private readonly route: ActivatedRoute
  ) {
    this.itemData = this.formBuilder.group({
      id: [''],
      image: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      freeShipping: [false],
      tags: [''],
      tag: [''],
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.mode == 1 || this.route.snapshot.queryParams.mode == 2) {
      let items = JSON.parse(window.sessionStorage.getItem("products"));
      let item = items.find(item => item.id == this.route.snapshot.queryParams.productId);
      item.tag = null;
      this.tags = item.tags;
      this.imageURL = item.image;
      this.itemData.setValue(item);
      if (this.route.snapshot.queryParams.mode == 1) {
        this.action = "update";
        this.rentBtnTitle = "Actualizar";
      } else {
        this.rentBtnTitle = "Comprar";
        this.readOnly = true;
      }
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

  uploadItem() {
    Swal.fire({ title: 'Cargando', allowOutsideClick: false });
    Swal.showLoading();
    this.itemData.get("image").setValue(this.imageURL)
    this.itemData.get("tags").setValue(this.tags)
    this.markFormGroupTouched(this.itemData)
    if (this.itemData.valid && this.imageURL) {
      let item = this.itemData.value
      delete item.tag;
      let savedItems = window.sessionStorage.getItem("products") ? JSON.parse(window.sessionStorage.getItem("products")) : []
      item.id = savedItems.length + 1;
      savedItems.push(item);
      window.sessionStorage.setItem("products", JSON.stringify(savedItems));
      Swal.fire({ title: 'Publicado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
        this.router.navigate(['/'])
      })
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

  updateItem() {
    Swal.fire({ title: 'Cargando', allowOutsideClick: false });
    Swal.showLoading();
    this.itemData.get("image").setValue(this.imageURL)
    this.itemData.get("tags").setValue(this.tags)
    this.markFormGroupTouched(this.itemData)
    if (this.itemData.valid && this.imageURL) {
      let item = this.itemData.value
      delete item.tag;
      let savedItems = JSON.parse(window.sessionStorage.getItem("products"))
      let itemIndex = savedItems.findIndex(item => item.id == this.itemData.value.id)
      savedItems[itemIndex] = item;
      window.sessionStorage.setItem("products", JSON.stringify(savedItems));
      Swal.close();
      Swal.fire({ title: 'Actualizado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
        this.router.navigate(['/'])
      })
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
      this.router.navigate(["product/purchase"], { queryParams: { productId: this.itemData.value.id } });
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
        let savedItems = JSON.parse(window.sessionStorage.getItem("products"))
        let itemIndex = savedItems.findIndex(item => item.id == this.itemData.value.id)
        savedItems.splice(itemIndex, 1);
        window.sessionStorage.setItem("products", JSON.stringify(savedItems));
        Swal.fire({ title: 'Eliminado exitosamente', allowOutsideClick: false, icon: 'success', timer: 2000, showConfirmButton: false }).then((result) => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
