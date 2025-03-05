import React from 'react';
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-christiane-bg py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div>
            <h3 className="text-christiane-soft-purple font-bold mb-4">Kontakt</h3>
            <p className="mb-2">Christiane Beyer</p>
            <p className="mb-2">Heilpraktikerin für Psychotherapie (HPP)</p>
            <p className="mb-2">Tannenweg 8, 65934 Frankfurt am Main</p>
            <p className="mb-2">
              <a href="tel:+4915111570330" className="hover:text-christiane-soft-purple transition-colors">
                +49 151 11570330
              </a>
            </p>
            <p>
              <a href="mailto:info@christianebeyer.de" className="hover:text-christiane-soft-purple transition-colors">
                info@christianebeyer.de
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-christiane-soft-purple font-bold mb-4">Social Media</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="https://wa.me/qr/7A6KMAI4APQPI1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-christiane-soft-purple transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="https://www.instagram.com/christiane.beyer.psychotherapie/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-christiane-soft-purple transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.linkedin.com/in/christiane-beyer-psychotherapie/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-christiane-soft-purple transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-christiane-soft-purple font-bold mb-4">Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="/impressum" className="hover:text-christiane-soft-purple transition-colors">
                Impressum
              </a>
              <a href="/datenschutz" className="hover:text-christiane-soft-purple transition-colors">
                Datenschutz
              </a>
              <a href="/booking" className="hover:text-christiane-soft-purple transition-colors">
                Termin vereinbaren
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Christiane Beyer. Alle Rechte vorbehalten.
          </p>
          <div className="mt-4 text-center">
            <Button variant="link" size="sm" className="text-xs text-gray-500 hover:text-christiane-soft-purple">
              <a href="/admin">Admin</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;