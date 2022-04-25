import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-title',
  templateUrl: './login-title.component.html',
  styleUrls: ['./login-title.component.scss']
})
export class LoginTitleComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    Swal.close()
  }
}
