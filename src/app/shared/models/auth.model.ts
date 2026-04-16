export interface User {
  id?: number | string;
  login?: string;
  email?: string;
  role: 'utilisateur' | 'admin' | 'super_admin';
}

export interface AuthResponse {
  token: string;
}
