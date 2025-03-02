
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronRight, Clock, Users } from 'lucide-react';
import { AppointmentStats, TimeSlotStats, Appointment, TimeSlot } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentsTable } from '@/components/admin/AppointmentsTable';
import { TimeSlotsTable } from '@/components/admin/TimeSlotsTable';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCards } from '@/components/admin/StatsCards';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    appointments: AppointmentStats;
    timeSlots: TimeSlotStats;
  }>({
    appointments: { total: 0, confirmed: 0, cancelled: 0, pending: 0 },
    timeSlots: { total: 0, available: 0, booked: 0 }
  });

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch time slots
        const { data: slotsData, error: slotsError } = await supabase
          .from('time_slots')
          .select('*')
          .order('date', { ascending: false });

        if (slotsError) throw slotsError;

        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*, time_slots(*)');

        if (appointmentsError) throw appointmentsError;

        // Map data to frontend models
        const mappedTimeSlots = slotsData.map((slot): TimeSlot => ({
          id: slot.id,
          date: slot.date,
          startTime: slot.start_time,
          endTime: slot.end_time,
          isAvailable: !slot.is_booked
        }));

        const mappedAppointments = appointmentsData.map((appointment): Appointment => {
          return {
            id: appointment.id,
            timeSlotId: appointment.time_slot_id,
            name: appointment.name,
            email: appointment.email,
            phone: appointment.phone || '',
            message: appointment.notes || '',
            status: 'confirmed', // Default status
            createdAt: appointment.created_at
          };
        });

        // Calculate stats
        const appointmentStats: AppointmentStats = {
          total: mappedAppointments.length,
          confirmed: mappedAppointments.filter(a => a.status === 'confirmed').length,
          cancelled: mappedAppointments.filter(a => a.status === 'cancelled').length,
          pending: mappedAppointments.filter(a => a.status === 'pending').length
        };

        const timeSlotStats: TimeSlotStats = {
          total: mappedTimeSlots.length,
          available: mappedTimeSlots.filter(ts => ts.isAvailable).length,
          booked: mappedTimeSlots.filter(ts => !ts.isAvailable).length
        };

        // Update state
        setTimeSlots(mappedTimeSlots);
        setAppointments(mappedAppointments);
        setStats({
          appointments: appointmentStats,
          timeSlots: timeSlotStats
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Fehler beim Laden der Daten');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Wird geladen...</div>;
  }

  if (!user) {
    return null; // Don't render anything, navigate effect will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="appointments">Termine</TabsTrigger>
          <TabsTrigger value="timeslots">Zeitfenster</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-8">
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Neueste Termine</CardTitle>
                  <CardDescription>Die letzten 5 Terminbuchungen</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Wird geladen...</p>
                  ) : appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.slice(0, 5).map((appointment) => {
                        const timeSlot = timeSlots.find(ts => ts.id === appointment.timeSlotId);
                        return (
                          <div key={appointment.id} className="flex justify-between items-center p-3 bg-accent/50 rounded-md">
                            <div>
                              <h4 className="font-medium">{appointment.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                {timeSlot ? (
                                  <span>{format(new Date(timeSlot.date), 'dd.MM.yyyy')} • {timeSlot.startTime} - {timeSlot.endTime}</span>
                                ) : 'Kein Zeitfenster gefunden'}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Details <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Keine Termine gefunden</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kommende Termine</CardTitle>
                  <CardDescription>Anstehende Termine für die nächsten Tage</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Wird geladen...</p>
                  ) : appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.slice(0, 5).map((appointment) => {
                        const timeSlot = timeSlots.find(ts => ts.id === appointment.timeSlotId);
                        return (
                          <div key={appointment.id} className="flex justify-between items-center p-3 bg-accent/50 rounded-md">
                            <div>
                              <h4 className="font-medium">{appointment.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                {timeSlot ? (
                                  <span>{format(new Date(timeSlot.date), 'dd.MM.yyyy')} • {timeSlot.startTime} - {timeSlot.endTime}</span>
                                ) : 'Kein Zeitfenster gefunden'}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Details <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Keine anstehenden Termine</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Alle Termine</CardTitle>
              <CardDescription>Verwalten Sie Ihre Termine</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentsTable 
                appointments={appointments} 
                timeSlots={timeSlots} 
                isLoading={isLoading} 
                onRefresh={() => setActiveTab('appointments')} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeslots">
          <Card>
            <CardHeader>
              <CardTitle>Zeitfenster</CardTitle>
              <CardDescription>Verwalten Sie Ihre verfügbaren Zeitfenster</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeSlotsTable 
                timeSlots={timeSlots} 
                isLoading={isLoading} 
                onRefresh={() => setActiveTab('timeslots')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
