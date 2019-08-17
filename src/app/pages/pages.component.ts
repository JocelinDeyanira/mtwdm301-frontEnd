import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var App: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
    App.initCore();
  }

  async isLogout(event) {
    // TO DO
    console.log(event);
    if (confirm(' ¿Está seguro de cerrar su sesión? ')) {
      this.authService.isLoginSuccess = await this.authService.logOut();
      if (!this.authService.isLoginSuccess) {
        this.router.navigate(['/login']);
      }
    }
  }
}
