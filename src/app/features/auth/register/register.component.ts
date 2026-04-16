import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div style="max-width: 400px; margin: 40px auto; background: white; padding: 32px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 class="mb-4">Créer un compte Admin</h2>

      <div *ngIf="error" class="alert">{{ error }}</div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div>
          <label>Identifiant</label>
          <input type="text" formControlName="login" placeholder="Votre identifiant">
        </div>

        <div>
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="admin@poplove.com">
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" formControlName="password" placeholder="••••••••">
        </div>

        <button type="submit" [disabled]="registerForm.invalid" style="width: 100%; margin-top: 10px;">
          S'inscrire
        </button>
      </form>

      <p class="mt-4" style="text-align: center; color: #666;">
        Déjà un compte ? <a routerLink="/login" style="color: #316B66; text-decoration: underline;">Se connecter</a>
      </p>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = '';
  registerForm = this.fb.group({
    login: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = "Erreur lors de l'inscription";
        }
      });
    }
  }
}
