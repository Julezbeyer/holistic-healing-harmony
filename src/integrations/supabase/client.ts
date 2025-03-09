// This file contains Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';  // Sie werden diese Datei im nächsten Schritt erstellen

// Supabase Verbindungsinformationen
const SUPABASE_URL = "https://lhmicelinsyzjhjiznqn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWljZWxpbnN5empoaml6bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NzAwMTcsImV4cCI6MjA1NjQ0NjAxN30.PA_0ILn7L0cCxjk6UbzKhZpysNxJcdN8N_7OkeGMDP0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Direkten Client erstellen
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Alternativer Client mit Proxy, falls der direkte Zugriff fehlschlägt
export const createProxiedClient = () => {
  // Bestimme, ob wir in einer Replit-Umgebung sind
  const isReplit = window.location.hostname.includes('replit');
  
  // Falls wir in Replit sind, nutze den Proxy für Anfragen
  if (isReplit) {
    const proxyUrl = window.location.origin + '/supabase-proxy';
    return createClient<Database>(
      proxyUrl,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        global: {
          headers: {
            'X-Client-Info': 'supabase-js-react-proxied',
          },
        },
      }
    );
  }
  
  // Sonst den regulären Client zurückgeben
  return supabase;
};
