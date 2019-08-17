import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService) {

  }

  canActivate() {
    var values = JSON.parse(localStorage.getItem("usuario"));

    if(values) {
    // if(this.authService.isAuthenticate()) {
      return true;
    }
    else {
      return this.router.parseUrl('/login');
      //return false;
    }
  }
}
