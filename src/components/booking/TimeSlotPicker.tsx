
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TimeSlot } from '@/lib/types';
import { formatTime } from '@/lib/date-utils';

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
}

export function TimeSlotPicker({ timeSlots, onTimeSlotSelect }: TimeSlotPickerProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const handleSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot.id);
    onTimeSlotSelect(timeSlot);
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Verfügbare Zeiten</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {timeSlots.map((timeSlot) => (
            <Button
              key={timeSlot.id}
              variant={selectedTimeSlot === timeSlot.id ? "default" : "outline"}
              className="w-full"
              disabled={!timeSlot.isAvailable}
              onClick={() => handleSelect(timeSlot)}
            >
              {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
            </Button>
          ))}
          
          {timeSlots.length === 0 && (
            <p className="text-muted-foreground col-span-3 text-center py-4">
              Keine Termine verfügbar an diesem Tag.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
