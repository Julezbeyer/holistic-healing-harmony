import { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ to, children, onClick }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'text-base font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-gray-700'
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const { user } = useAuth();
  
  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold text-primary">
          Christiane Beyer
        </Link>
        
        <nav className={`hidden md:flex space-x-6 text-base ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
          <NavLink to="/">Startseite</NavLink>
          <NavLink to="#about">Über uns</NavLink>
          <NavLink to="#approaches">Therapieansätze</NavLink>
          <NavLink to="#contact">Kontakt</NavLink>
          <NavLink to="/booking">Termin buchen</NavLink>
          {user && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-500 focus:outline-none">
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-20">
              <div className="flex flex-col space-y-4">
                <NavLink to="/" onClick={closeMobileMenu}>Startseite</NavLink>
                <NavLink to="#about" onClick={closeMobileMenu}>Über uns</NavLink>
                <NavLink to="#approaches" onClick={closeMobileMenu}>Therapieansätze</NavLink>
                <NavLink to="#contact" onClick={closeMobileMenu}>Kontakt</NavLink>
                <NavLink to="/booking" onClick={closeMobileMenu}>Termin buchen</NavLink>
                {user && <NavLink to="/admin" onClick={closeMobileMenu}>Admin</NavLink>}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
