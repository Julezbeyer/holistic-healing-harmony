
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TherapyApproaches from '@/components/sections/TherapyApproaches';
import Contact from '@/components/sections/Contact';
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { t, dir } = useLanguage();

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
    <div className="min-h-screen flex flex-col" dir={dir}>
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
