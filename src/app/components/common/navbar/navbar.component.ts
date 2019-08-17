import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  email: any = '';


  userData: any = {};

  @Input() logoutTitle:string
  @Input() nombre:string
  @Output() clickLogout:EventEmitter<string> = new EventEmitter()

  constructor(private authService:AuthService,private router:Router ) { }

  ngOnInit() {
    this.userData = this.authService.appUserProfile;
    console.log(this.userData);

    this.email = JSON.parse(localStorage.getItem("correo"));
  }

  logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("correo");
    localStorage.removeItem("foto");
    localStorage.removeItem("sesion");

    console.log("ya no debe ir nada" + JSON.parse(localStorage.getItem("correo")));
    this.clickLogout.emit('Logout en curso');
    this.router.navigate(['/login']);
  }

}