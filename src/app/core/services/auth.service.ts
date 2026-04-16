import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
  private userSignal = signal<User | null>(null);
  
  public user = this.userSignal.asReadonly();
  public isAuthenticated = computed(() => this.userSignal() !== null);
  public isAdmin = computed(() => ['admin', 'super_admin'].includes(this.userSignal()?.user_role || ''));
  public isSuperAdmin = computed(() => this.userSignal()?.user_role === 'super_admin');

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          this.logout();
        } else {
          this.userSignal.set({
            user_id: decoded.userId,
            user_login: decoded.login,
            user_role: decoded.role
          });
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('jwt_token', token);
        const decoded = jwtDecode<any>(token);
        this.userSignal.set({
          user_id: decoded.userId,
          user_login: decoded.login,
          user_role: decoded.role
        });
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.userSignal.set(null);
  }
}
