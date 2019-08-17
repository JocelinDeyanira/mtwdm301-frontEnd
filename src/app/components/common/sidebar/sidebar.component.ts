import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  today= new Date();
  jstoday = '';
  userData: any = {}

  name: any = '';
  picture: any = '';
  sesion: any = '';

  constructor(private authService:AuthService) { 
    this.jstoday = formatDate(this.today, 'M/d/yy h:mm a', 'en-US');
    localStorage.setItem("sesion", JSON.stringify(this.jstoday));
  }

  ngOnInit() {
    this.userData = this.authService.appUserProfile;

    this.name = JSON.parse(localStorage.getItem("usuario"));
    this.picture = JSON.parse(localStorage.getItem("foto"));
    this.sesion = JSON.parse(localStorage.getItem("sesion"));
  }

  
}
