import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatTime, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/booking/DatePicker';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { BookingForm } from '@/components/booking/BookingForm';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { toast } from 'sonner';
import { ChevronLeft, Calendar, Clock, Loader2 } from 'lucide-react';

enum BookingStep {
  SELECT_DATE,
  SELECT_TIME,
  FILL_FORM,
  CONFIRMATION
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SELECT_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; appointment: any | null }>({ success: false, appointment: null });


  // Fetch time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchTimeSlots = async () => {
      setIsLoading(true);

      try {
        // Formatiere das Datum für Supabase (YYYY-MM-DD)
        const formattedDate = selectedDate.toISOString().split('T')[0];

        // Prüfe, ob bereits Zeitfenster für diesen Tag existieren
        const { data: existingSlots, error: fetchError } = await supabase
          .from('time_slots')
          .select('*')
          .eq('date', formattedDate);

        if (fetchError) throw fetchError;

        // Wenn Zeitfenster existieren, verwende diese
        if (existingSlots && existingSlots.length > 0) {
          const mappedSlots = existingSlots.map(slot => ({
            id: slot.id,
            date: slot.date,
            startTime: slot.start_time,
            endTime: slot.end_time,
            isAvailable: !slot.is_booked
          }));

          setTimeSlots(mappedSlots);
        } else {
          // Generiere neue Zeitfenster und speichere sie in Supabase
          const generatedSlots = generateTimeSlots(selectedDate);

          // Speichere die Slots in Supabase
          const { data: savedSlots, error: insertError } = await supabase
            .from('time_slots')
            .insert(
              generatedSlots.map(slot => ({
                date: formattedDate,
                start_time: slot.startTime,
                end_time: slot.endTime,
                is_booked: false
              }))
            )
            .select();

          if (insertError) throw insertError;

          if (savedSlots) {
            // Mappe die gespeicherten Slots zum Frontend-Format
            const mappedSlots = savedSlots.map(slot => ({
              id: slot.id,
              date: slot.date,
              startTime: slot.start_time,
              endTime: slot.end_time,
              isAvailable: !slot.is_booked
            }));

            setTimeSlots(mappedSlots);
          }
        }

        setCurrentStep(BookingStep.SELECT_TIME);
      } catch (error) {
        console.error('Error fetching/creating time slots:', error);
        toast.error('Fehler beim Laden der Verfügbarkeiten');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(BookingStep.FILL_FORM);
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Submitting booking with time slot ID:', selectedTimeSlot?.id);

      if (!selectedTimeSlot?.id) {
        throw new Error('Kein Zeitfenster ausgewählt');
      }

      // Prüfen, ob der Zeitslot tatsächlich existiert
      const { data: slotExists, error: slotCheckError } = await supabase
        .from('time_slots')
        .select('id')
        .eq('id', selectedTimeSlot.id)
        .single();

      if (slotCheckError || !slotExists) {
        console.error('Time slot check error:', slotCheckError);
        throw new Error(`Das gewählte Zeitfenster existiert nicht in der Datenbank: ${JSON.stringify(slotCheckError || 'No data')}`);
      }

      // Create appointment record in Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          time_slot_id: selectedTimeSlot.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes || null,  // Explizit null setzen wenn leer
        })
        .select()
        .single();

      if (error) {
        console.error('Appointment creation error:', error);
        throw new Error(`Error creating appointment: ${JSON.stringify(error)}`);
      }

      // Update time slot to mark as booked
      const { error: updateError } = await supabase
        .from('time_slots')
        .update({ is_booked: true })
        .eq('id', selectedTimeSlot.id);

      if (updateError) {
        console.error('Time slot update error:', updateError);
        throw new Error(`Error updating time slot: ${JSON.stringify(updateError)}`);
      }

      setBookingResult({
        success: true,
        appointment: data,
      });

      setCurrentStep(BookingStep.CONFIRMATION);
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast.error('Fehler bei der Terminbuchung: ' + (error.message || 'Unbekannter Fehler'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setCurrentStep(BookingStep.SELECT_DATE);
    setSelectedDate(undefined);
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    setAppointment(null);
    setIsSubmitting(false);
    setIsLoading(false);
    setBookingResult({ success: false, appointment: null });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Termin anfragen</h1>
          <p className="text-muted-foreground">
            Wählen Sie einen passenden Termin für Ihre persönliche Beratung oder Therapie. Ihre Anfrage wird geprüft und zeitnah bestätigt.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < currentStep ? 'bg-primary text-primary-foreground' : 
                    i === currentStep ? 'bg-primary/20 text-primary border border-primary' : 
                    'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              Schritt {currentStep + 1} von {Object.keys(BookingStep).length / 2}
            </span>
          </div>
        </div>

        {currentStep === BookingStep.SELECT_DATE && (
          <DatePicker onDateSelect={handleDateSelect} />
        )}

        {currentStep === BookingStep.SELECT_TIME && (
          <>
            <Card className="mb-4 p-3 border border-primary/20 bg-primary/5 shadow-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1 text-primary" />
                  <button
                    onClick={() => setCurrentStep(BookingStep.SELECT_DATE)}
                    className="text-primary font-medium"
                  >
                    Zurück zur Datumsauswahl
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedDate ? selectedDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }) : ''}
                </div>
              </div>
            </Card>

            {isLoading ? (
              <div className="text-center py-16 flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Lade verfügbare Termine...</p>
              </div>
            ) : (
              <TimeSlotPicker 
                timeSlots={timeSlots} 
                onTimeSlotSelect={handleTimeSlotSelect} 
                selectedDate={selectedDate}
              />
            )}
          </>
        )}

        {currentStep === BookingStep.FILL_FORM && selectedTimeSlot && (
          <>
            <Card className="mb-4 p-3 border border-primary/20 bg-primary/5 shadow-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1 text-primary" />
                  <button
                    onClick={() => setCurrentStep(BookingStep.SELECT_TIME)}
                    className="text-primary font-medium"
                  >
                    Zurück zur Zeitauswahl
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedDate ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{formatTime(selectedTimeSlot.startTime)} - {formatTime(selectedTimeSlot.endTime)}</span>
                    </div>
                  ) : ''}
                </div>
              </div>
            </Card>

            <BookingForm 
              selectedTimeSlot={selectedTimeSlot}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}

        {currentStep === BookingStep.CONFIRMATION && bookingResult.success && bookingResult.appointment && selectedTimeSlot && (
          <BookingConfirmation 
            appointment={bookingResult.appointment}
            timeSlot={selectedTimeSlot}
            onDone={resetBooking}
          />
        )}
      </div>
    </div>
  );
}