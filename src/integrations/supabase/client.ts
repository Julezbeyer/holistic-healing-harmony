
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL und/oder Anon Key fehlen in den Umgebungsvariablen.');
}

// Supabase client with typing
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
