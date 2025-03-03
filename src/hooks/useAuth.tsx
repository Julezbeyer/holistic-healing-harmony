import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { AuthState } from '@/types/auth'; // Assuming this type is defined elsewhere

interface AuthUser {
  id: string;
  email: string | null;
  role?: string; // Added role property
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Fetch user data with role information
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData, error: userError }) => {
            const authUser: AuthUser = {
              id: session.user.id,
              email: session.user.email,
              role: userData?.role || 'user',
            };
            setUser(authUser);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
            .then(({ data: userData, error: userError }) => {
              const authUser: AuthUser = {
                id: session.user.id,
                email: session.user.email,
                role: userData?.role || 'user',
              };
              setUser(authUser);
              setLoading(false);
            });
        } else {
          setUser(null);
          setLoading(false);
        }
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