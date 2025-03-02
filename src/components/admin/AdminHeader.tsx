
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Willkommen, {user?.email || 'Administrator'}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={signOut}>Abmelden</Button>
      </div>
    </div>
  );
}
