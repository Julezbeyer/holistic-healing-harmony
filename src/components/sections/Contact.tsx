
import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would connect this to a Supabase function
      // that sends the email or saves the contact request to a database
      
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Ihre Nachricht wurde erfolgreich gesendet!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error('Es gab einen Fehler beim Senden Ihrer Nachricht.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast.info('Bitte melden Sie sich an, um einen Termin zu buchen.');
      navigate('/auth');
      return;
    }
    
    // In a full implementation, this would redirect to a booking page
    toast.success('Terminbuchungsfunktion folgt in Kürze!');
  };

  return (
    <section id="contact" className="section-padding bg-christiane-soft-purple/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
            Kontakt
          </span>
          <h2 className="heading-lg mb-6">Nehmen Sie Kontakt auf</h2>
          <p className="subtitle mx-auto">
            Ich freue mich darauf, Sie auf Ihrem Weg zu mehr Wohlbefinden und Vitalität zu begleiten.
            Kontaktieren Sie mich für einen persönlichen Termin oder bei Fragen zu meinen Therapieangeboten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue flex-shrink-0 mr-4">
                  <Phone className="h-5 w-5 text-christiane-medium-blue" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Telefon</h4>
                  <a href="tel:+4917298709110" className="text-foreground hover:text-primary transition-colors">+49 172 9870910</a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue flex-shrink-0 mr-4">
                  <Mail className="h-5 w-5 text-christiane-medium-blue" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">E-Mail</h4>
                  <a href="mailto:beyer1510@gmail.com" className="text-foreground hover:text-primary transition-colors">beyer1510@gmail.com</a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5"></path>
                    <path d="M13.5 14H14a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1v5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">WhatsApp</h4>
                  <a href="https://wa.me/qr/7A6KMAI4APQPI1" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-green-600 transition-colors">Direkt kontaktieren</a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue flex-shrink-0 mr-4">
                  <MapPin className="h-5 w-5 text-christiane-medium-blue" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Standort</h4>
                  <p className="text-foreground mb-2">Wilhelm-Blos-Straße 59<br />71636 Ludwigsburg</p>
                  <a 
                    href="https://maps.google.com/?q=Wilhelm-Blos-Straße+59,+Ludwigsburg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Auf Google Maps anzeigen
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <h4 className="font-medium mb-4">Termin buchen</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Buchen Sie online einen Termin für Ihre persönliche Beratung oder Therapie.
              </p>
              <Button 
                onClick={() => navigate('/booking')}
                className="w-full"
              >
                Termin vereinbaren
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-xl shadow-card">
              <h3 className="text-2xl font-medium mb-6">Kontaktformular</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Ihr Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Ihre E-Mail-Adresse"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Betreff Ihrer Nachricht"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Ihre Nachricht"
                    required
                  ></textarea>
                </div>
                <div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    disabled={loading}
                  >
                    {loading ? 'Wird gesendet...' : 'Nachricht senden'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-card h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342106!2d9.1929!3d48.8938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db34f84b88fd%3A0x79ad9dfcbda65413!2sWilhelm-Blos-Stra%C3%9Fe%2059%2C%2071636%20Ludwigsburg!5e0!3m2!1sen!2sde!4v1646305121212!5m2!1sen!2sde" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Standort Christiane Beyer"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
