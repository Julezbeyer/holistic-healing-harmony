import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Supabase URL and Anon Key should be configured as environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Supabase client with typing
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);