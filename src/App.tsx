import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TestPanel from "./components/TestPanel";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import MetaVital from './pages/MetaVital';
import Pricing from './pages/Pricing';
import Knowledge from './pages/Knowledge';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact'; // Neue Kontaktseite importieren

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/test-panel" element={<TestPanel />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/meta-vital" element={<MetaVital />} />
              <Route path="/preise" element={<Pricing />} />
              <Route path="/wissen" element={<Knowledge />} />
              <Route path="/wissen/:articleId" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} /> {/* Neue Route für die Kontaktseite */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;