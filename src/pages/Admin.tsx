
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminAppointments } from '@/components/admin/AdminAppointments';
import { AdminTimeSlots } from '@/components/admin/AdminTimeSlots';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { supabase } from '@/integrations/supabase/client';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Prüfen, ob der Benutzer authentifiziert ist
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Für eine einfache Implementierung: Wir prüfen nur, ob der Benutzer eingeloggt ist
          // In einer vollständigen Implementierung würden wir Rollen prüfen
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <p className="text-muted-foreground">Lade...</p>
      </div>
    );
  }

  // Wenn nicht authentifiziert, zeigen wir den Login-Screen
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin-Bereich</h1>
        <Button variant="outline" onClick={handleLogout}>
          Abmelden
        </Button>
      </div>

      <Tabs defaultValue="termine">
        <TabsList className="mb-8">
          <TabsTrigger value="termine">Termine</TabsTrigger>
          <TabsTrigger value="zeitfenster">Zeitfenster</TabsTrigger>
        </TabsList>

        <TabsContent value="termine">
          <Card>
            <CardHeader>
              <CardTitle>Terminanfragen</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminAppointments />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zeitfenster">
          <Card>
            <CardHeader>
              <CardTitle>Verfügbare Zeitfenster</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminTimeSlots />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminAppointments } from '@/components/admin/AdminAppointments';
import { AdminTimeSlots } from '@/components/admin/AdminTimeSlots';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Users, Calendar, Clock, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Wenn nicht authentifiziert, zeige den Login-Bereich automatisch an
      setActiveTab('login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated && activeTab !== 'login') {
    return (
      <div className="container mx-auto px-4 py-8">
        <AdminAuth onAuthSuccess={() => setActiveTab('dashboard')} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isAuthenticated ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin-Bereich</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Angemeldet als: {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Termine</span>
              </TabsTrigger>
              <TabsTrigger value="timeslots" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden md:inline">Zeitfenster</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Benutzer</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Einstellungen</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <AdminDashboard />
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-6">
              <AdminAppointments />
            </TabsContent>
            
            <TabsContent value="timeslots" className="space-y-6">
              <AdminTimeSlots />
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <AdminAuth onAuthSuccess={() => setActiveTab('dashboard')} />
      )}
    </div>
  );
}
