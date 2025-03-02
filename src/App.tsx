
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
