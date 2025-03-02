
import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/booking/DatePicker';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { BookingForm } from '@/components/booking/BookingForm';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { Appointment, TimeSlot } from '@/lib/types';
import { generateTimeSlots } from '@/lib/date-utils';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  
  // Fetch time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;
    
    const fetchTimeSlots = async () => {
      setIsLoading(true);
      
      try {
        // For demo, we'll generate time slots and mark some as unavailable
        // In a real app, you would fetch this from Supabase
        const generatedSlots = generateTimeSlots(selectedDate).map(slot => ({
          ...slot,
          id: uuidv4(),
          isAvailable: Math.random() > 0.3 // Randomly mark some as unavailable for demo
        }));
        
        setTimeSlots(generatedSlots);
        setCurrentStep(BookingStep.SELECT_TIME);
      } catch (error) {
        console.error('Error fetching time slots:', error);
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
  
  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    if (!selectedTimeSlot) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a new appointment
      const newAppointment: Appointment = {
        id: uuidv4(),
        timeSlotId: selectedTimeSlot.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      // In a real app, you would save this to Supabase
      // Example:
      // const { error } = await supabase
      //   .from('appointments')
      //   .insert(newAppointment);
      
      // if (error) throw error;
      
      // Update the time slot to be unavailable
      // const { error: timeSlotError } = await supabase
      //   .from('time_slots')
      //   .update({ isAvailable: false })
      //   .eq('id', selectedTimeSlot.id);
      
      // if (timeSlotError) throw timeSlotError;
      
      // For demo, we'll just simulate a server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send confirmation email (in a real app)
      // await sendConfirmationEmail(newAppointment, selectedTimeSlot);
      
      setAppointment(newAppointment);
      setCurrentStep(BookingStep.CONFIRMATION);
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Fehler bei der Terminbuchung');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetBooking = () => {
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    setAppointment(null);
    setCurrentStep(BookingStep.SELECT_DATE);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Termin buchen</h1>
          <p className="text-muted-foreground">
            Wählen Sie einen passenden Termin für Ihre persönliche Beratung oder Therapie.
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
            <button
              onClick={() => setCurrentStep(BookingStep.SELECT_DATE)}
              className="mb-4 text-sm text-primary flex items-center"
            >
              ← Zurück zur Datumsauswahl
            </button>
            
            {isLoading ? (
              <div className="text-center py-8">Lade Verfügbarkeiten...</div>
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
              ← Zurück zur Zeitauswahl
            </button>
            
            <BookingForm 
              selectedTimeSlot={selectedTimeSlot}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
        
        {currentStep === BookingStep.CONFIRMATION && appointment && selectedTimeSlot && (
          <BookingConfirmation 
            appointment={appointment}
            timeSlot={selectedTimeSlot}
            onDone={resetBooking}
          />
        )}
      </div>
    </div>
  );
}
