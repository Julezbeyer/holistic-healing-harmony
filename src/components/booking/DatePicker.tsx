
import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { getNextNDays, isWeekend } from '@/lib/date-utils';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

interface DatePickerProps {
  onDateSelect: (date: Date | undefined) => void;
  excludeDates?: Date[];
  disableWeekends?: boolean;
}

export function DatePicker({ 
  onDateSelect,
  excludeDates = [],
  disableWeekends = true
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [nextAvailableDate, setNextAvailableDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    findNextAvailableDate();
  }, []);
  
  const findNextAvailableDate = async () => {
    setLoading(true);
    let currentDate = new Date();
    let found = false;
    let attempts = 0;
    
    while (!found && attempts < 30) { // Suche für max. 30 Tage
      currentDate = addDays(currentDate, attempts === 0 ? 0 : 1);
      attempts++;
      
      // Überspringe Wochenenden
      if (disableWeekends && isWeekend(currentDate)) {
        continue;
      }
      
      // Suche nach verfügbaren Zeitfenstern für diesen Tag
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      
      const { data: timeSlots, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('date', formattedDate)
        .eq('is_booked', false)
        .limit(1);
      
      if (error) {
        console.error('Fehler beim Laden der Zeitfenster:', error);
        continue;
      }
      
      if (timeSlots && timeSlots.length > 0) {
        found = true;
        setNextAvailableDate(new Date(formattedDate));
        
        // Automatisch dieses Datum auswählen
        setDate(new Date(formattedDate));
        onDateSelect(new Date(formattedDate));
      }
    }
    
    setLoading(false);
  };
  
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };
  
  const isDateUnavailable = (date: Date) => {
    if (disableWeekends && isWeekend(date)) {
      return true;
    }
    
    return excludeDates.some(excludeDate => 
      excludeDate.toDateString() === date.toDateString()
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        {loading ? (
          <div className="text-center py-4">Suche nach freien Terminen...</div>
        ) : nextAvailableDate ? (
          <div>
            <div className="mb-3 bg-primary/10 p-3 rounded-md">
              <p className="font-medium">Nächster freier Termin:</p>
              <p>{format(nextAvailableDate, 'dd. MMMM yyyy', { locale: de })}</p>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              disabled={isDateUnavailable}
              modifiers={{
                highlighted: nextAvailableDate ? [nextAvailableDate] : []
              }}
              modifiersStyles={{
                highlighted: { backgroundColor: 'rgba(var(--primary), 0.1)' }
              }}
              initialFocus
              className="rounded-md border"
            />
          </div>
        ) : (
          <div>
            <div className="mb-3 bg-red-100 text-red-800 p-3 rounded-md">
              <p>Keine freien Termine gefunden.</p>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              disabled={isDateUnavailable}
              initialFocus
              className="rounded-md border"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
