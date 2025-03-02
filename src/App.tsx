
import { BrowserRouter as Router } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  return (
    <TooltipProvider>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </Router>
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
