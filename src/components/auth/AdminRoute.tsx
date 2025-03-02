
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has admin role when component mounts
    const checkAdminRole = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();
        
        if (error || !data) {
          toast.error('Sie haben keine Administratorrechte');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast.error('Fehler bei der Überprüfung der Berechtigungen');
        navigate('/');
      }
    };
    
    if (!loading && user) {
      checkAdminRole();
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Wird geladen...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}
