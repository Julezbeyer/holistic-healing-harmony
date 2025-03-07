import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TherapyApproaches from '@/components/sections/TherapyApproaches';
import Contact from '@/components/sections/Contact';
import { Brain, HeartPulse } from 'lucide-react';
import Layout from "@/components/layout/Layout";

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
    <Layout>
      <Hero 
        title="Psychotherapeutische Begleitung"
        subtitle="Christiane Beyer - Psychologische Psychotherapeutin und Supervisorin"
        imageUrl="/christiane-beyer.jpg"
      />
      <About />
      <TherapyApproaches />
      <Contact />
    </Layout>
  );
}