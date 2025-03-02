
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TherapyApproaches from '@/components/sections/TherapyApproaches';
import Contact from '@/components/sections/Contact';
import { Brain, HeartPulse } from 'lucide-react';

export default function Index() {
  // Helper function to handle smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial hash if present
    handleHashChange();

    // Add listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow">
        <Hero />
        <About />
        <TherapyApproaches />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
import { Navbar } from "@/components/ui/Navbar";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { t, dir } = useLanguage();
  
  return (
    <div className="min-h-screen" dir={dir}>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          {t('home')}
        </h1>
        <p className="mb-4">
          Welcome to our booking system. Click on the {t('booking')} link to make a reservation.
        </p>
      </main>
    </div>
  );
}
