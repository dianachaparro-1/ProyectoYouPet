import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public readonly router: Router,
  ) {}
  
   async ngOnInit() {
    /*
    if (!window.sessionStorage.getItem("user")) {
      await this.router.navigate(['login']);
    }
    */
  }

  title = 'youpet-front';
}
