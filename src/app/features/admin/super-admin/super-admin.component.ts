import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/models/auth.model';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <h1>Gestion des Utilisateurs (Super Admin)</h1>
    </div>

    <div *ngIf="message" class="alert">{{ message }}</div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Login</th>
          <th>Email</th>
          <th>Rôle Actuel</th>
          <th>Changer Rôle</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let u of utilisateurs">
          <td>{{ u.user_id }}</td>
          <td>{{ u.user_login }}</td>
          <td>{{ u.user_mail }}</td>
          <td><strong>{{ u.user_role }}</strong></td>
          <td>
            <ng-container *ngIf="u.user_role === 'super_admin'; else selectTemplate">
              <em>Inchangeable</em>
            </ng-container>
            <ng-template #selectTemplate>
              <select (change)="modifierRole(u.user_id, $event)">
                <option value="utilisateur" [selected]="u.user_role === 'utilisateur'">Utilisateur</option>
                <option value="admin" [selected]="u.user_role === 'admin'">Admin</option>
              </select>
            </ng-template>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class SuperAdminComponent implements OnInit {
  private http = inject(HttpClient);
  
  utilisateurs: User[] = [];
  message = '';

  ngOnInit() {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.http.get<any>('http://localhost:3000/utilisateurs').subscribe(res => {
      this.utilisateurs = res;
    });
  }

  modifierRole(id: number | string | undefined, event: any) {
    if(!id) return;
    const newRole = event.target.value;
    
    if (confirm(`Passer l'utilisateur ${id} au rôle ${newRole} ?`)) {
      this.http.put(`http://localhost:3000/utilisateurs/${id}/role`, { role: newRole })
        .subscribe({
          next: () => {
            this.message = "Rôle mis à jour avec succès.";
            this.chargerUtilisateurs();
          },
          error: () => {
            this.message = "Erreur de mise à jour.";
          }
        });
    } else {
      this.chargerUtilisateurs(); // Reset select
    }
  }
}
