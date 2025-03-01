
import Button from '../ui/Button';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-christiane-soft-blue/30 via-transparent to-christiane-soft-purple/20 pointer-events-none" />
      
      {/* Decorative circle */}
      <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-christiane-soft-green rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-christiane-soft-purple rounded-full blur-3xl opacity-30 animate-float animation-delay-2000" />
      
      <div className="container mx-auto px-6 py-12 relative z-10 fade-in-cascade">
        <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-christiane-soft-cream mb-6">
          Ganzheitliches Gesundheitskonzept
        </span>
        <h1 className="heading-xl mb-6 max-w-4xl">
          Heilung für Körper, Geist und Seele
        </h1>
        <p className="subtitle mb-10 max-w-2xl">
          Entdecken Sie mit Christiane Beyer einen integrativen Ansatz, der modernste Frequenztherapie 
          mit ganzheitlichen Heilmethoden verbindet – für nachhaltiges Wohlbefinden und neue Vitalität.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Termin vereinbaren
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('therapy')?.scrollIntoView({ behavior: 'smooth' })}>
            Therapieansätze entdecken
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer" onClick={scrollToAbout}>
        <span className="text-sm mb-2 text-muted-foreground">Mehr erfahren</span>
        <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
      </div>
    </div>
  );
}
