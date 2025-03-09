import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuliere API-Aufruf
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich so schnell wie möglich bei Ihnen melden.");
      // Formular zurücksetzen
      setName('');
      setEmail('');
      setMessage('');
      setPhone('');
    } catch (error) {
      toast.error("Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per Telefon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4">Kontakt</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Haben Sie Fragen zu meinen Angeboten oder möchten Sie einen Termin vereinbaren? Ich freue mich, von Ihnen zu hören.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Kontaktinformationen */}
            <div className="md:col-span-1">
              <h2 className="heading-md mb-6">Kontaktdaten</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-christiane-soft-blue/30 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-christiane-medium-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefon</h3>
                    <a 
                      href="tel:+4917298709110" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +49 172 9870910
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-christiane-soft-purple/30 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">E-Mail</h3>
                    <a 
                      href="mailto:beyer1510@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      beyer1510@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-christiane-soft-green/30 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Adresse</h3>
                    <address className="not-italic text-muted-foreground">
                      Wilhelm-Blos-Straße 59<br />
                      71636 Ludwigsburg
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-medium mb-3">Öffnungszeiten</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Montag - Freitag</li>
                  <li>09:00 - 17:00 Uhr</li>
                  <li className="text-sm mt-2">
                    Termine nach Vereinbarung
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Kontaktformular */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-card p-8">
                <h2 className="heading-md mb-6">Nachricht senden</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Name *
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ihr Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        E-Mail *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ihre E-Mail-Adresse"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ihre Telefonnummer (optional)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Nachricht *
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Wie kann ich Ihnen helfen?"
                      rows={6}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Nachricht wird gesendet...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Nachricht senden
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Google Maps Karte */}
          <div className="mt-20">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-card">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342106!2d9.1929!3d48.8938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db34f84b88fd%3A0x79ad9dfcbda65413!2sWilhelm-Blos-Stra%C3%9Fe%2059%2C%2071636%20Ludwigsburg!5e0!3m2!1sen!2sde!4v1646305121212!5m2!1sen!2sde" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Standort von Christiane Beyer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
