import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  action?: React.ReactNode;
}

export default function Hero({ title, subtitle, imageUrl, action }: HeroProps) {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/Herovideo.mp4" 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/70 via-transparent to-purple-400/50"></div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-green-300 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="p-8 rounded-lg bg-white/30 backdrop-blur-sm">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-amber-50 mb-6">
            Ganzheitliches Gesundheitskonzept
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl text-white drop-shadow-md">
            Heilung für Körper, Geist und Seele
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-white">
            Entdecken Sie mit Christiane Beyer einen integrativen Ansatz, der modernste Frequenztherapie 
            mit ganzheitlichen Heilmethoden verbindet – für nachhaltiges Wohlbefinden und neue Vitalität.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Termin vereinbaren
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('therapy')?.scrollIntoView({ behavior: 'smooth' })}>
              Therapieansätze entdecken
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10" onClick={scrollToAbout}>
        <span className="text-sm mb-2 text-white font-medium">Mehr erfahren</span>
        <ArrowDown className="h-5 w-5 text-white animate-bounce" />
      </div>
    </div>
  );
}