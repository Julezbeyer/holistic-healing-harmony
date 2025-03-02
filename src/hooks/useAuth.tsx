
import { useState, useEffect, useContext, ReactNode, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  checkRole: (role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Check if user is admin
      if (session?.user) {
        checkIfAdmin(session.user);
      }

      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Check if user is admin
        if (session?.user) {
          await checkIfAdmin(session.user);

          // Redirect to admin dashboard if user is admin and just logged in
          if (isAdmin && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            navigate('/admin');
          }
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function checkIfAdmin(user: User) {
    try {
      // Query your user roles table or check for admin metadata
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setIsAdmin(data.role === 'admin');
        return;
      }

      // Fallback: Check user metadata if available
      const isAdminFromMeta = user.app_metadata?.is_admin || user.user_metadata?.is_admin;
      setIsAdmin(!!isAdminFromMeta);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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
    isAdmin,
    signIn,
    signOut,
    loading,
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
