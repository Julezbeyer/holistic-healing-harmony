import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/booking/DatePicker';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { BookingForm } from '@/components/booking/BookingForm';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { Appointment, TimeSlot, BookingFormData } from '@/lib/types';
import { generateTimeSlots } from '@/lib/date-utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Navbar } from "@/components/ui/Navbar";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

enum BookingStep {
  SELECT_DATE,
  SELECT_TIME,
  FILL_FORM,
  CONFIRMATION
}

export default function Booking() {
  const { t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SELECT_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; appointment: any | null }>({ success: false, appointment: null });

  useEffect(() => {
    if (!selectedDate) return;

    const fetchTimeSlots = async () => {
      setIsLoading(true);

      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];

        const { data: existingSlots, error: fetchError } = await supabase
          .from('time_slots')
          .select('*')
          .eq('date', formattedDate);

        if (fetchError) throw fetchError;

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
          const generatedSlots = generateTimeSlots(selectedDate);

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

      const { data: slotExists, error: slotCheckError } = await supabase
        .from('time_slots')
        .select('id')
        .eq('id', selectedTimeSlot.id)
        .single();

      if (slotCheckError || !slotExists) {
        console.error('Time slot check error:', slotCheckError);
        throw new Error(`Das gewählte Zeitfenster existiert nicht in der Datenbank: ${JSON.stringify(slotCheckError || 'No data')}`);
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert({
          time_slot_id: selectedTimeSlot.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes || null
        })
        .select()
        .single();

      if (error) {
        console.error('Appointment creation error:', error);
        throw new Error(`Error creating appointment: ${JSON.stringify(error)}`);
      }

      const { error: updateError } = await supabase
        .from('time_slots')
        .update({ is_booked: true })
        .eq('id', selectedTimeSlot.id);

      if (updateError) {
        console.error('Time slot update error:', updateError);
        throw new Error(`Error updating time slot: ${JSON.stringify(updateError)}`);
      }

      // E-Mail-Bestätigung senden
      try {
        import('@/lib/email-utils').then(({ sendConfirmationEmail }) => {
          sendConfirmationEmail(data[0], selectedTimeSlot).then(() => {
            console.log('Bestätigungs-E-Mail gesendet');
          }).catch((emailError) => {
            console.error('Fehler beim Senden der Bestätigungs-E-Mail:', emailError);
            // Buchung wird trotzdem fortgesetzt, auch wenn E-Mail fehlschlägt
          });
        });
      } catch (emailError) {
        console.error('Fehler beim Senden der Bestätigungs-E-Mail:', emailError);
        // Buchung wird trotzdem fortgesetzt, auch wenn E-Mail fehlschlägt
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
      setIsSubmitting(false);
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
    <div className="min-h-screen" dir={dir}>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t('booking')}</h1>
            <p className="text-muted-foreground">
              {t('bookingDescription')}
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
                {t('step')} {currentStep + 1} {t('of')} {Object.keys(BookingStep).length / 2}
              </span>
            </div>
          </div>

          {currentStep === BookingStep.SELECT_DATE && (
            <DatePicker onDateSelect={handleDateSelect} />
          )}

          {currentStep === BookingStep.SELECT_TIME && (
            <>
              <button
                onClick={() => setCurrentStep(BookingStep.SELECT_DATE)}
                className="mb-4 text-sm text-primary flex items-center"
              >
                ← {t('backToDateSelection')}
              </button>

              {isLoading ? (
                <div className="text-center py-8">{t('loadingAvailability')}</div>
              ) : (
                <TimeSlotPicker 
                  timeSlots={timeSlots} 
                  onTimeSlotSelect={handleTimeSlotSelect} 
                />
              )}
            </>
          )}

          {currentStep === BookingStep.FILL_FORM && selectedTimeSlot && (
            <>
              <button
                onClick={() => setCurrentStep(BookingStep.SELECT_TIME)}
                className="mb-4 text-sm text-primary flex items-center"
              >
                ← {t('backToTimeSelection')}
              </button>

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
    </div>
  );
}
