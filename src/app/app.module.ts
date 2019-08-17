// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
// Firebase Modules
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Routes
import { AppRoutingModule } from './app-routing.module';
// Components
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Environment variables
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [LoginComponent,
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AngularFireModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.SETTINGS.FIREBASE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
