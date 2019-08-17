// Módulos
import { Routes, RouterModule} from '@angular/router';
// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        component: PagesComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:'',redirectTo:'/dashboard',pathMatch:'full'}
        ]
    }
];

export const PagesRoutingModule = RouterModule.forChild(routes)