// Módulos
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
// Routes
import { PagesRoutingModule } from './pages.routes';
// Componentes
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../components/common/navbar/navbar.component';
import { SidebarComponent } from '../components/common/sidebar/sidebar.component';
import { FooterComponent } from '../components/common/footer/footer.component';
import { RightsidebarComponent } from '../components/common/rightsidebar/rightsidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../components/common/header/header.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RightsidebarComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ChartsModule,
    AngularMultiSelectModule,
    FormsModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PagesModule { }
