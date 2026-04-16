export interface User {
  user_id?: number | string;
  user_login?: string;
  user_mail?: string;
  user_role: 'utilisateur' | 'admin' | 'super_admin';
}

export interface AuthResponse {
  token: string;
}
