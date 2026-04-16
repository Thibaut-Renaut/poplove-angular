import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div style="max-width: 400px; margin: 40px auto; background: white; padding: 32px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 class="mb-4">Admin Login</h2>

      <div *ngIf="error" class="alert">{{ error }}</div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div>
          <label>Identifiant</label>
          <input type="text" formControlName="login" placeholder="Votre identifiant">
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" formControlName="password" placeholder="••••••••">
        </div>

        <button type="submit" [disabled]="loginForm.invalid" style="width: 100%; margin-top: 10px;">
          Se connecter
        </button>
      </form>

      <p class="mt-4" style="text-align: center; color: #666;">
        Pas encore de compte ? <a routerLink="/register" style="color: #316B66; text-decoration: underline;">S'inscrire</a>
      </p>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = '';
  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = 'Identifiants incorrects';
        }
      });
    }
  }
}
