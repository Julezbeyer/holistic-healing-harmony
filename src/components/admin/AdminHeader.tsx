
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AdminHeader() {
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const { checkRole } = useAuth();

  useEffect(() => {
    const verifyAdminRole = async () => {
      const hasAdminRole = await checkRole('admin');
      setIsAdmin(hasAdminRole);
    };

    verifyAdminRole();
  }, [checkRole]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1 flex items-center">
          Willkommen, {user?.email || 'Administrator'}
          {isAdmin && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <Shield className="mr-1 h-3.5 w-3.5" />
              Administrator
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={signOut}>Abmelden</Button>
      </div>
    </div>
  );
}
