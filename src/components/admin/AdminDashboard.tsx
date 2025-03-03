
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalTimeSlots: 0,
    bookedPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        // Gesamtzahl der Termine
        const { count: totalAppointments, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true });

        // Anstehende Termine
        const today = new Date().toISOString().split('T')[0];
        const { count: upcomingAppointments, error: upcomingError } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .gte('date', today);

        // Zeitfenster Statistiken
        const { count: totalTimeSlots, error: timeSlotsError } = await supabase
          .from('time_slots')
          .select('*', { count: 'exact', head: true });

        const { count: bookedTimeSlots, error: bookedError } = await supabase
          .from('time_slots')
          .select('*', { count: 'exact', head: true })
          .eq('is_booked', true);

        if (appointmentsError || upcomingError || timeSlotsError || bookedError) {
          throw new Error('Fehler beim Laden der Statistiken');
        }

        const bookedPercentage = totalTimeSlots ? Math.round((bookedTimeSlots / totalTimeSlots) * 100) : 0;

        setStats({
          totalAppointments: totalAppointments || 0,
          upcomingAppointments: upcomingAppointments || 0,
          totalTimeSlots: totalTimeSlots || 0,
          bookedPercentage
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamt Termine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">Termine gesamt</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anstehende Termine</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
              <p className="text-xs text-muted-foreground">Ab heute</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verfügbare Zeitfenster</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTimeSlots}</div>
              <p className="text-xs text-muted-foreground">Insgesamt</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auslastung</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bookedPercentage}%</div>
              <p className="text-xs text-muted-foreground">Der Zeitfenster gebucht</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
