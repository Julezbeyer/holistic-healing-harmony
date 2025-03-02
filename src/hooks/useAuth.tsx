
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { UserRole } from '@/lib/types';

interface AuthUser {
  id: string;
  email: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  session: any;
  loading: boolean;
  signOut: () => Promise<void>;
  checkRole: (role: UserRole) => Promise<boolean>;
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

  const checkRole = async (role: UserRole): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Use the has_role function we created in the database
      const { data, error } = await supabase.rpc('has_role', { 
        _role: role 
      });
      
      if (error) {
        console.error('Error checking role:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error(`Error checking ${role} role:`, error);
      return false;
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    checkRole,
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
