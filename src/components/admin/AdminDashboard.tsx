
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Clock, CheckCircle2, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function AdminDashboard() {
  // Stats state
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalTimeSlots: 0,
    bookedPercentage: 0
  });
  
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  
  // Settings state
  const [workingHours, setWorkingHours] = useState({
    startTime: '09:00',
    endTime: '17:00'
  });
  const [appointmentDuration, setAppointmentDuration] = useState(60);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weekendBookings, setWeekendBookings] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  useEffect(() => {
    if (selectedTab === 'dashboard') {
      fetchStats();
    } else if (selectedTab === 'appointments') {
      fetchAppointments();
    }
    // We can add more fetches for other tabs as needed
  }, [selectedTab]);

  // Fetch dashboard statistics
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

      setStats({
        totalAppointments: totalAppointments || 0,
        upcomingAppointments: upcomingAppointments || 0,
        totalTimeSlots: totalTimeSlots || 0,
        bookedPercentage: totalTimeSlots ? Math.round((bookedTimeSlots || 0) / totalTimeSlots * 100) : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Fehler beim Laden der Statistiken');
    } finally {
      setLoading(false);
    }
  }

  // Fetch appointments
  async function fetchAppointments() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          time_slot:time_slots(date, start_time, end_time)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Fehler beim Laden der Termine');
    } finally {
      setLoading(false);
    }
  }

  // Handle saving settings
  const handleSaveSettings = async () => {
    try {
      // Here you would save settings to the database
      toast.success('Einstellungen gespeichert');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Fehler beim Speichern der Einstellungen');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Termine</span>
          </TabsTrigger>
          <TabsTrigger value="timeslots" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Zeitfenster</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Einstellungen</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamt Termine</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                <p className="text-xs text-muted-foreground">Termine insgesamt</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anstehende Termine</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
                <p className="text-xs text-muted-foreground">Noch ausstehend</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verfügbare Zeitfenster</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTimeSlots}</div>
                <p className="text-xs text-muted-foreground">Insgesamt</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auslastung</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.bookedPercentage}%</div>
                <p className="text-xs text-muted-foreground">Gebuchte Zeitfenster</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Termine Verwaltung</CardTitle>
              <CardDescription>
                Verwalten Sie alle Kundentermine
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Lade Termine...</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-4">Keine Termine gefunden</div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment: any) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{appointment.name}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.email}</p>
                            <p className="text-sm">
                              {appointment.time_slot?.date} • {appointment.time_slot?.start_time}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Bearbeiten</Button>
                            <Button variant="destructive" size="sm">Stornieren</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Slots Tab */}
        <TabsContent value="timeslots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zeitfenster Verwaltung</CardTitle>
              <CardDescription>
                Erstellen und verwalten Sie verfügbare Zeitfenster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Button className="w-full md:w-auto">Neue Zeitfenster erstellen</Button>
                </div>
                {/* Here would be a list or calendar of time slots */}
                <div className="text-center py-10">
                  Zeitfenster-Kalender würde hier angezeigt werden
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Einstellungen</CardTitle>
              <CardDescription>
                Konfigurieren Sie Ihre Buchungseinstellungen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Öffnungszeiten</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Beginn</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={workingHours.startTime}
                        onChange={(e) => setWorkingHours({ ...workingHours, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Ende</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={workingHours.endTime}
                        onChange={(e) => setWorkingHours({ ...workingHours, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Termindauer (Minuten)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    step="15"
                    value={appointmentDuration}
                    onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoConfirm">Automatische Bestätigung</Label>
                    <p className="text-sm text-muted-foreground">
                      Termine automatisch bestätigen
                    </p>
                  </div>
                  <Switch
                    id="autoConfirm"
                    checked={autoConfirm}
                    onCheckedChange={setAutoConfirm}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificationsEnabled">E-Mail-Benachrichtigungen</Label>
                    <p className="text-sm text-muted-foreground">
                      Benachrichtigungen bei neuen Buchungen
                    </p>
                  </div>
                  <Switch
                    id="notificationsEnabled"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekendBookings">Wochenend-Buchungen</Label>
                    <p className="text-sm text-muted-foreground">
                      Buchungen am Wochenende erlauben
                    </p>
                  </div>
                  <Switch
                    id="weekendBookings"
                    checked={weekendBookings}
                    onCheckedChange={setWeekendBookings}
                  />
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button onClick={handleSaveSettings} className="w-full">
                Einstellungen speichern
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
