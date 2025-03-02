
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

import { AuthProvider } from '@/hooks/useAuth';
import Admin from '@/pages/Admin';
import { AdminRoute } from '@/components/auth/AdminRoute';

function App() {
  return (
    <div className="app">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;
