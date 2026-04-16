import { Routes } from '@angular/router';
import { VitrineComponent } from './features/vitrine/vitrine.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CartComponent } from './features/cart/cart.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { SuperAdminComponent } from './features/admin/super-admin/super-admin.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: VitrineComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard(['admin', 'super_admin'])]
  },
  { 
    path: 'dashboard/utilisateurs', 
    component: SuperAdminComponent,
    canActivate: [authGuard(['super_admin'])]
  },
  { path: '**', redirectTo: '' }
];
