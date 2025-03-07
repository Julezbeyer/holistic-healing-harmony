import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Über Uns', href: '#about' },
  { name: 'Therapieansätze', href: '#therapy' },
  { name: 'Kontakt', href: '#contact' }
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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12", 
        isScrolled ? "bg-white/70 backdrop-blur-lg shadow-subtle py-4" : "bg-transparent py-6"
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

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-all duration-300 transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-foreground/90 py-2"
              onClick={() => {
                setIsOpen(false);
              }}
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
    </nav>
  );
}