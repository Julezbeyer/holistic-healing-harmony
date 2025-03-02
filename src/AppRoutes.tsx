
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Booking from '@/pages/Booking';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
