
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
