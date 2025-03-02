
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80" 
          alt="Sonnenstrahlen durch den Wald - symbolisiert Heilung und Wohlbefinden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-christiane-soft-blue/70 via-transparent to-christiane-soft-purple/50"></div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-christiane-soft-green rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-christiane-soft-purple rounded-full blur-3xl opacity-30 animate-float animation-delay-2000" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="fade-in-cascade p-8 rounded-lg bg-white/30 backdrop-blur-sm">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-christiane-soft-cream mb-6">
            {language === 'de' ? 'Ganzheitliches Gesundheitskonzept' : 
             language === 'en' ? 'Holistic Health Concept' : 
             'مفهوم الصحة الشاملة'}
          </span>
          <h1 className="heading-xl mb-6 max-w-4xl text-white text-shadow">
            {language === 'de' ? 'Heilung für Körper, Geist und Seele' : 
             language === 'en' ? 'Healing for Body, Mind and Soul' : 
             'علاج للجسم والعقل والروح'}
          </h1>
          <p className="subtitle mb-10 max-w-2xl text-white">
            {language === 'de' ? 'Entdecken Sie mit Christiane Beyer einen integrativen Ansatz, der modernste Frequenztherapie mit ganzheitlichen Heilmethoden verbindet – für nachhaltiges Wohlbefinden und neue Vitalität.' : 
             language === 'en' ? 'Discover with Christiane Beyer an integrative approach that combines modern frequency therapy with holistic healing methods - for sustainable well-being and new vitality.' : 
             'اكتشف مع كريستيان باير نهجًا متكاملًا يجمع بين العلاج بالترددات الحديثة وطرق الشفاء الشاملة - من أجل رفاهية مستدامة وحيوية جديدة.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('makeAppointment')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('therapy')?.scrollIntoView({ behavior: 'smooth' })}>
              {language === 'de' ? 'Therapieansätze entdecken' : 
               language === 'en' ? 'Discover therapy approaches' : 
               'اكتشف أساليب العلاج'}
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
