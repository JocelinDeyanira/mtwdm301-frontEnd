import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path:'login' ,component: LoginComponent},
  {path:'' ,redirectTo: "/login", pathMatch: 'full'},
  {path:'**',component: PageNotFoundComponent}
  ];
  
export const AppRoutingModule=RouterModule.forRoot(routes, {useHash:true})