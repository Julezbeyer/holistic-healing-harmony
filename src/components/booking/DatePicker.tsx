
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { getNextNDays, isWeekend } from '@/lib/date-utils';

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
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={isDateUnavailable}
          initialFocus
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
