import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../core/validators/email.validator'
import { NameValidator } from '../../core/validators/name.validator'
import { UsernameValidator } from '../../core/validators/username.validator'
import { LastNameValidator } from '../../core/validators/lastName.validator'
import { PasswordValidator } from '../../core/validators/password.validator'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() userData: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.userData = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', UsernameValidator.isValid],
      email: ['', EmailValidator.isValid],
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      password1: ['', PasswordValidator.isValid],
      password2: ['', PasswordValidator.isValid],
      role: ['client'],
      id: ['']
    })
  }

  ngOnInit(): void {
  }

  assignUserForm(userForm) {
    this.userData.setValue(userForm)
  }
}
