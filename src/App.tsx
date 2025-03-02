import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';

import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';
import { AdminRoute } from '@/components/auth/AdminRoute';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AuthProvider>
          <div className="app">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AuthProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;