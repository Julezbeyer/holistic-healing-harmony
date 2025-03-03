import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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