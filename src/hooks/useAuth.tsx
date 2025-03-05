
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string | null; // Changed from required to optional to match Supabase User type
}

interface AuthContextType {
  user: AuthUser | null;
  session: any;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email
          };
          setUser(authUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SupabaseSession, AuthState } from '@/types/supabase';

// Create context with initial state
const AuthContext = createContext<AuthState>({
  session: null,
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setAuthState({
          session: data.session,
          user: data.session?.user || null,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error checking auth session:', error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          session,
          user: session?.user || null,
          isLoading: false,
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => authState,
    [authState.session, authState.user, authState.isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
