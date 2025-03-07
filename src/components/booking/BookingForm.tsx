import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimeSlot } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/date-utils';

interface BookingFormProps {
  selectedTimeSlot: TimeSlot;
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
  }) => void;
  isSubmitting: boolean;
}

export function BookingForm({ 
  selectedTimeSlot, 
  onSubmit,
  isSubmitting 
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // Removed message state
  //const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Termin buchen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-3 bg-primary/10 rounded-lg">
          <p className="font-medium">Ausgewählter Termin:</p>
          <p>{formatDate(selectedTimeSlot.date)}</p>
          <p>{formatTime(selectedTimeSlot.startTime)} - {formatTime(selectedTimeSlot.endTime)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input 
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Removed message field */}
          {/* <div>
            <Label htmlFor="message">Nachricht (optional)</Label>
            <Textarea 
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div> */}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wird gesendet..." : "Termin anfragen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}