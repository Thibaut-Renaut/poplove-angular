import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav>
      <div class="brand">
        <a routerLink="/">PopLove Angular</a>
      </div>
      <div class="links items-center">
        <a routerLink="/">Boutique</a>
        
        <ng-container *ngIf="auth.isAuthenticated()">
          <a *ngIf="auth.isAdmin()" routerLink="/dashboard">Catalogue</a>
          <a *ngIf="auth.isSuperAdmin()" routerLink="/dashboard/utilisateurs">Utilisateurs</a>
          <button (click)="logout()">Déconnexion</button>
        </ng-container>

        <ng-container *ngIf="!auth.isAuthenticated()">
          <a routerLink="/login"><button>Admin</button></a>
        </ng-container>

        <a routerLink="/cart">
          Panier ({{ cart.totalItems() }})
        </a>
      </div>
    </nav>
  `
})
export class NavigationComponent {
  auth = inject(AuthService);
  cart = inject(CartService);

  logout() {
    this.auth.logout();
  }
}
