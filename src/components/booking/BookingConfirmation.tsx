
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Appointment, TimeSlot } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/date-utils';

interface BookingConfirmationProps {
  appointment: Appointment;
  timeSlot: TimeSlot;
  onDone: () => void;
}

export function BookingConfirmation({ 
  appointment, 
  timeSlot,
  onDone 
}: BookingConfirmationProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <CardTitle>Buchung bestätigt</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          Vielen Dank für Ihre Buchung. Eine Bestätigungs-E-Mail wurde an {appointment.email} gesendet.
        </p>
        
        <div className="mb-6 p-4 bg-primary/10 rounded-lg text-left">
          <p className="font-medium mb-2">Termindetails:</p>
          <p>Datum: {formatDate(timeSlot.date)}</p>
          <p>Zeit: {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}</p>
          <p>Name: {appointment.name}</p>
          <p>E-Mail: {appointment.email}</p>
          {appointment.phone && <p>Telefon: {appointment.phone}</p>}
        </div>
        
        <Button onClick={onDone} className="w-full">
          Fertig
        </Button>
      </CardContent>
    </Card>
  );
}
