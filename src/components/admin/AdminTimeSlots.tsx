
import { useState, useEffect } from 'react';
import { addDays, format, parseISO, startOfDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Typdefinitionen
interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export function AdminTimeSlots() {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:00');
  const [isCreating, setIsCreating] = useState(false);

  // Lade Zeitfenster für das ausgewählte Datum
  useEffect(() => {
    if (!date) return;
    
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
        
        const { data, error } = await supabase
          .from('time_slots')
          .select('*')
          .eq('date', formattedDate)
          .order('start_time');
          
        if (error) throw error;
        
        setTimeSlots(data || []);
      } catch (error) {
        console.error('Error fetching time slots:', error);
        toast.error('Fehler beim Laden der Zeitfenster');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeSlots();
  }, [date]);

  const handleAddTimeSlot = async () => {
    try {
      setIsCreating(true);
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Prüfen, ob das Zeitfenster mit einem bestehenden überschneidet
      const hasOverlap = timeSlots.some(slot => {
        if (slot.is_booked) return false; // Ignore bereits gebuchte Slots
        
        const slotStart = slot.start_time;
        const slotEnd = slot.end_time;
        
        return (
          (newStartTime >= slotStart && newStartTime < slotEnd) ||
          (newEndTime > slotStart && newEndTime <= slotEnd) ||
          (newStartTime <= slotStart && newEndTime >= slotEnd)
        );
      });
      
      if (hasOverlap) {
        toast.error('Dieses Zeitfenster überschneidet sich mit einem bestehenden Zeitfenster');
        return;
      }
      
      const { data, error } = await supabase
        .from('time_slots')
        .insert({
          date: formattedDate,
          start_time: newStartTime,
          end_time: newEndTime,
          is_booked: false
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setTimeSlots([...timeSlots, data]);
      toast.success('Zeitfenster erstellt');
    } catch (error) {
      console.error('Error creating time slot:', error);
      toast.error('Fehler beim Erstellen des Zeitfensters');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTimeSlot = async (id: string) => {
    try {
      // Prüfen, ob der Slot bereits gebucht ist
      const slot = timeSlots.find(s => s.id === id);
      if (slot?.is_booked) {
        toast.error('Gebuchte Zeitfenster können nicht gelöscht werden');
        return;
      }
      
      const { error } = await supabase
        .from('time_slots')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setTimeSlots(timeSlots.filter(slot => slot.id !== id));
      toast.success('Zeitfenster gelöscht');
    } catch (error) {
      console.error('Error deleting time slot:', error);
      toast.error('Fehler beim Löschen des Zeitfensters');
    }
  };

  const formatTimeDisplay = (time: string) => {
    return time.substring(0, 5); // Format HH:MM
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h3 className="font-medium text-lg mb-4">Datum auswählen</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            locale={de}
            disabled={{ before: startOfDay(new Date()) }}
            className="rounded-md border"
          />
          
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Neues Zeitfenster</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Startzeit</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">Endzeit</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={handleAddTimeSlot} 
                disabled={isCreating}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Zeitfenster hinzufügen
              </Button>
            </div>
          </div>
        </div>
        
        <Separator orientation="vertical" className="hidden md:block" />
        <Separator className="md:hidden my-4" />
        
        <div className="md:w-2/3">
          <h3 className="font-medium text-lg mb-4">
            Zeitfenster für {format(date, 'dd. MMMM yyyy', { locale: de })}
          </h3>
          
          {loading ? (
            <p className="text-muted-foreground">Lädt Zeitfenster...</p>
          ) : timeSlots.length === 0 ? (
            <p className="text-muted-foreground">Keine Zeitfenster vorhanden für dieses Datum</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Startzeit</TableHead>
                  <TableHead>Endzeit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{formatTimeDisplay(slot.start_time)}</TableCell>
                    <TableCell>{formatTimeDisplay(slot.end_time)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        slot.is_booked 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {slot.is_booked ? 'Gebucht' : 'Verfügbar'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTimeSlot(slot.id)}
                        disabled={slot.is_booked}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
