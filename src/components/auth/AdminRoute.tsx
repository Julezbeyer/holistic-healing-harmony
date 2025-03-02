
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading, checkRole } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  
  useEffect(() => {
    const verifyAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }
      
      try {
        const hasAdminRole = await checkRole('admin');
        setIsAdmin(hasAdminRole);
        
        if (!hasAdminRole) {
          toast.error('Sie haben keine Administratorrechte');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        toast.error('Fehler bei der Überprüfung der Berechtigungen');
        navigate('/');
      } finally {
        setCheckingAdmin(false);
      }
    };
    
    if (!loading) {
      verifyAdminRole();
    }
  }, [user, loading, navigate, checkRole]);
  
  if (loading || checkingAdmin) {
    return <div className="flex justify-center items-center h-screen">Wird geladen...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}
