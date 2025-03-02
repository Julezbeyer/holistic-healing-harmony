
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (user === null || !isAdmin) {
      navigate('/');
      return;
    }

    // Fetch data
    async function fetchData() {
      setLoading(true);
      
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*, time_slots(*)');
      
      if (!appointmentsError) {
        setAppointments(appointmentsData);
      }

      // Fetch time slots
      const { data: timeSlotsData, error: timeSlotsError } = await supabase
        .from('time_slots')
        .select('*')
        .order('date', { ascending: true });
      
      if (!timeSlotsError) {
        setTimeSlots(timeSlotsData);
      }

      setLoading(false);
    }

    fetchData();
  }, [user, isAdmin, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Termine</TabsTrigger>
          <TabsTrigger value="timeslots">Zeitfenster</TabsTrigger>
          <TabsTrigger value="analytics">Statistiken</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Terminübersicht</CardTitle>
              <CardDescription>Alle gebuchten Termine</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Lädt...</p>
              ) : appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Datum</th>
                        <th className="p-2 text-left">Zeit</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Telefon</th>
                        <th className="p-2 text-left">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b">
                          <td className="p-2">{new Date(appointment.time_slots.date).toLocaleDateString()}</td>
                          <td className="p-2">{`${appointment.time_slots.start_time} - ${appointment.time_slots.end_time}`}</td>
                          <td className="p-2">{appointment.name}</td>
                          <td className="p-2">{appointment.email}</td>
                          <td className="p-2">{appointment.phone}</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Keine Termine gefunden.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeslots">
          <Card>
            <CardHeader>
              <CardTitle>Zeitfenster</CardTitle>
              <CardDescription>Verfügbare und gebuchte Zeitfenster</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Lädt...</p>
              ) : timeSlots.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Datum</th>
                        <th className="p-2 text-left">Von</th>
                        <th className="p-2 text-left">Bis</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot) => (
                        <tr key={slot.id} className="border-b">
                          <td className="p-2">{new Date(slot.date).toLocaleDateString()}</td>
                          <td className="p-2">{slot.start_time}</td>
                          <td className="p-2">{slot.end_time}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${slot.is_booked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                              {slot.is_booked ? 'Gebucht' : 'Verfügbar'}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button variant="outline" size="sm" className="mr-2">Bearbeiten</Button>
                            <Button variant="destructive" size="sm">Löschen</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Keine Zeitfenster gefunden.</p>
              )}
              <div className="mt-4">
                <Button>Neues Zeitfenster hinzufügen</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Statistiken</CardTitle>
              <CardDescription>Buchungsübersicht und Trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{appointments.length}</div>
                    <p className="text-muted-foreground">Gebuchte Termine</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {timeSlots.filter(slot => !slot.is_booked).length}
                    </div>
                    <p className="text-muted-foreground">Verfügbare Zeitfenster</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {timeSlots.filter(slot => slot.is_booked).length}
                    </div>
                    <p className="text-muted-foreground">Belegte Zeitfenster</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button>Bericht generieren</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
