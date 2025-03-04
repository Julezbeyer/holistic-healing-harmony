
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type TimeSlot = {
  id: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  date: string;
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (date) {
      fetchAvailableTimeSlots(format(date, 'yyyy-MM-dd'));
    }
  }, [date]);

  const fetchAvailableTimeSlots = async (dateString: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('date', dateString)
        .eq('is_available', true)
        .order('start_time');

      if (error) throw error;
      setAvailableTimeSlots(data || []);
    } catch (error: any) {
      toast.error('Fehler beim Laden der verfügbaren Termine: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitBooking = async () => {
    if (!selectedTimeSlot) {
      toast.error('Bitte wählen Sie einen Termin aus');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create appointment record
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          time_slot_id: selectedTimeSlot.id,
          name,
          email,
          phone,
          message,
          status: 'pending'
        })
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // 2. Update time slot availability
      const { error: timeSlotError } = await supabase
        .from('time_slots')
        .update({ is_available: false })
        .eq('id', selectedTimeSlot.id);

      if (timeSlotError) throw timeSlotError;

      // Success
      toast.success('Ihre Terminanfrage wurde erfolgreich übermittelt!');
      setStep(4); // Move to success step
    } catch (error: any) {
      toast.error('Fehler bei der Terminbuchung: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeSlot = (timeSlot: TimeSlot) => {
    // Correctly format time from database format (HH:MM:SS) to display format (HH:MM)
    const startTime = timeSlot.start_time.substring(0, 5);
    const endTime = timeSlot.end_time.substring(0, 5);
    return `${startTime} - ${endTime}`;
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Reset selection if going back to date selection
      if (step === 3) {
        setSelectedTimeSlot(null);
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-christiane-soft-blue/20 to-christiane-soft-purple/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack} 
              className="mr-2"
              aria-label="Zurück"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="heading-lg text-center flex-grow pr-8">Termin anfragen</h1>
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Wählen Sie einen passenden Termin für Ihre persönliche Beratung oder Therapie. 
            Ihre Anfrage wird geprüft und zeitnah bestätigt.
          </p>

          {/* Progress steps */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>1</div>
              <div className="w-8 h-1 bg-primary/20"></div>
              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>2</div>
              <div className="w-8 h-1 bg-primary/20"></div>
              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${step === 3 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>3</div>
              <div className="w-8 h-1 bg-primary/20"></div>
              <div className={`rounded-full w-10 h-10 flex items-center justify-center ${step === 4 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>4</div>
            </div>
          </div>

          {/* Step content */}
          <div className="mt-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="heading-md text-center mb-6">Wählen Sie ein Datum</h2>
                
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={de}
                    className="rounded-md border"
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </div>
                
                {date && (
                  <div className="text-center mt-4">
                    <p className="font-medium">Ausgewähltes Datum: 
                      <span className="ml-2 text-primary">{format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}</span>
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center mt-8">
                  <Button 
                    size="lg" 
                    onClick={() => setStep(2)} 
                    disabled={!date}
                    className="px-8"
                  >
                    Weiter zu verfügbaren Zeiten
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="heading-md text-center mb-2">Verfügbare Zeiten</h2>
                
                <p className="text-center text-muted-foreground">
                  Für {date && format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}
                </p>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    {availableTimeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                        className={`py-6 ${selectedTimeSlot?.id === slot.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {formatTimeSlot(slot)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Keine verfügbaren Termine an diesem Tag.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)} 
                      className="mt-4"
                    >
                      Anderes Datum wählen
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                  >
                    Zurück
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!selectedTimeSlot}
                  >
                    Weiter zur Anfragestellung
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="heading-md text-center mb-2">Ihre Kontaktdaten</h2>
                
                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <p className="font-medium">Ausgewählter Termin:</p>
                  <p>{date && format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}</p>
                  <p>{selectedTimeSlot && formatTimeSlot(selectedTimeSlot)}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(2)}
                  >
                    Zurück
                  </Button>
                  <Button 
                    onClick={submitBooking} 
                    disabled={isLoading || !name || !email || !phone}
                  >
                    {isLoading ? 'Wird gesendet...' : 'Termin anfragen'}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6 py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="heading-md">Terminanfrage erfolgreich!</h2>
                
                <p className="text-muted-foreground max-w-md mx-auto">
                  Vielen Dank für Ihre Anfrage. Ich werde mich zeitnah bei Ihnen melden, um den Termin zu bestätigen.
                </p>
                
                <div className="bg-primary/10 rounded-lg p-4 max-w-sm mx-auto mt-8 text-left">
                  <p className="font-medium">Angefragter Termin:</p>
                  <p>{date && format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}</p>
                  <p>{selectedTimeSlot && formatTimeSlot(selectedTimeSlot)}</p>
                </div>
                
                <Button 
                  onClick={() => navigate('/')} 
                  className="mt-8"
                >
                  Zurück zur Startseite
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
