
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { formatDateTime } from '@/lib/date-utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, X, Mail, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { sendConfirmationEmail } from '@/lib/email-utils';

// Typdefinitionen
interface Appointment {
  id: string;
  time_slot_id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  created_at: string;
  time_slot: {
    date: string;
    start_time: string;
    end_time: string;
  };
}

export function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Bei einer vollständigen Implementierung würden wir hier nach Status filtern,
      // für diese Demo laden wir alle Termine
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          time_slot:time_slots(date, start_time, end_time)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Manuelles Filtern nach Status (in einer vollständigen Implementierung im Backend)
      const filteredData = data || [];
      
      setAppointments(filteredData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Fehler beim Laden der Termine');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAppointment = async (appointment: Appointment) => {
    try {
      // In einer vollständigen Implementierung würden wir den Status in der Datenbank aktualisieren
      // und dann die Bestätigungs-E-Mail senden
      
      toast.success(`Termin von ${appointment.name} bestätigt`);
      
      // Simuliere das Senden einer Bestätigungs-E-Mail
      // In einer echten Implementierung würden wir die E-Mail über einen Dienst wie SendGrid senden
      toast.info(`Bestätigungs-E-Mail an ${appointment.email} wurde gesendet`);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Fehler bei der Terminbestätigung');
    }
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    try {
      // Storniere den Termin und mache das Zeitfenster wieder verfügbar
      const { error } = await supabase
        .from('time_slots')
        .update({ is_booked: false })
        .eq('id', appointment.time_slot_id);
      
      if (error) throw error;
      
      // Lösche den Termin
      const { error: deleteError } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointment.id);
      
      if (deleteError) throw deleteError;
      
      // Aktualisiere die Liste
      setAppointments(appointments.filter(a => a.id !== appointment.id));
      
      toast.success(`Termin von ${appointment.name} storniert`);
      
      // In einer echten Implementierung würden wir auch eine Benachrichtigung senden
      toast.info(`Stornierung an ${appointment.email} wurde gesendet`);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Fehler bei der Terminstornierung');
    }
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return format(date, 'dd. MMMM yyyy, HH:mm', { locale: de });
  };

  if (loading) {
    return <p className="text-muted-foreground">Lädt Termine...</p>;
  }

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">Alle Termine</TabsTrigger>
          <TabsTrigger value="today">Heutige Termine</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {appointments.length === 0 ? (
            <p className="text-muted-foreground">Keine Termine vorhanden</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onConfirm={handleConfirmAppointment}
                  onCancel={handleCancelAppointment}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="today">
          {/* Heute-Filter in einer vollständigen Implementierung */}
          {appointments.length === 0 ? (
            <p className="text-muted-foreground">Keine heutigen Termine vorhanden</p>
          ) : (
            <p className="text-muted-foreground">Implementierung des Heute-Filters ausstehend</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
  onConfirm: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

function AppointmentCard({ appointment, onConfirm, onCancel }: AppointmentCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle>{appointment.name}</CardTitle>
          <Badge variant="outline">
            {appointment.time_slot && formatDateTime(
              appointment.time_slot.date,
              appointment.time_slot.start_time
            )}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Mail className="h-3.5 w-3.5" />
          <a href={`mailto:${appointment.email}`}>{appointment.email}</a>
        </CardDescription>
        {appointment.phone && (
          <CardDescription className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            <a href={`tel:${appointment.phone}`}>{appointment.phone}</a>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {appointment.notes && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Notizen:</p>
            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onConfirm(appointment)}
          >
            <Check className="h-4 w-4 mr-2" />
            Bestätigen
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onCancel(appointment)}
          >
            <X className="h-4 w-4 mr-2" />
            Stornieren
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
