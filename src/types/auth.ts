
export interface User {
  id: string;
  email: string;
  role?: 'admin' | 'user';
  created_at?: string;
  last_sign_in_at?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}
