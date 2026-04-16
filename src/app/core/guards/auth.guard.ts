import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    const { isAdmin, isSuperAdmin } = authService;
    
    let hasRole = false;
    if (allowedRoles.includes('admin') && isAdmin()) hasRole = true;
    if (allowedRoles.includes('super_admin') && isSuperAdmin()) hasRole = true;

    if (!hasRole) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
};
