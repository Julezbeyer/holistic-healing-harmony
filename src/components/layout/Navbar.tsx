import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// Aktualisierte Navigationselemente
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Über Uns', href: '/#about' }, // Explizites /-Präfix für die Startseite
  { name: 'Therapieansätze', href: '/#therapy' }, // Explizites /-Präfix für die Startseite
  { name: 'Preise', href: '/preise' },
  { name: 'Wissen', href: '/wissen' },
  { name: 'Kontakt', href: '/#contact' } // Explizites /-Präfix für die Startseite
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(!!data);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12", 
          isScrolled ? "bg-white/70 backdrop-blur-lg shadow-subtle py-4" : "bg-white/70 backdrop-blur-lg shadow-subtle py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="font-serif text-xl font-medium tracking-tight"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Christiane Beyer
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {item.name}
              </a>
            ))}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Admin
              </Link>
            )}
            
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Abmelden</span>
              </Button>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Anmelden</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button with solid background */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl z-50 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "transform-none" : "translate-x-full"
        )}
      >
        {/* Prominent Close Button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Menü schließen"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col space-y-6 overflow-y-auto pb-20">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-foreground/90 py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {isAdmin && (
            <Link
              to="/admin"
              className="text-lg font-medium text-primary py-2"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          
          {user ? (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="text-lg font-medium text-foreground/90 py-2 flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Abmelden</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-lg font-medium text-foreground/90 py-2 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Anmelden</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}