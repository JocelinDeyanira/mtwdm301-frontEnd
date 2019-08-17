import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  public appUserProfile:any = {};
  public isLoginSuccess:boolean = false;
  constructor(private angularFireAuth:AngularFireAuth) { }

  async signIn():Promise<boolean> {

    let provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})
    this.appUserProfile = await this.angularFireAuth.auth.signInWithPopup(provider);

    if(Object.keys(this.appUserProfile).length > 0)
    {
        console.log(this.appUserProfile);
        this.isLoginSuccess = true;

        this.userData = this.appUserProfile;
        localStorage.setItem("usuario", JSON.stringify(this.userData.additionalUserInfo.profile.name));
        localStorage.setItem("correo", JSON.stringify(this.userData.additionalUserInfo.profile.email));
        localStorage.setItem("foto", JSON.stringify(this.userData.additionalUserInfo.profile.picture));
    }

    return Promise.resolve(this.isLoginSuccess);
  }

  isAuthenticate() {
    return this.isLoginSuccess;
  }

  async logOut(): Promise<boolean> {

    await this.angularFireAuth.auth.signOut();
    return Promise.resolve(false);
  }

  getRolesByUser() {

  }
}
