
import { SupabaseClient, Session } from '@supabase/supabase-js';

export type { Session as SupabaseSession };

export interface AuthState {
  session: Session | null;
  user: Session['user'] | null;
  isLoading: boolean;
}
