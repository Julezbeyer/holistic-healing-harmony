import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-input py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-xl font-medium tracking-tight mb-4 inline-block">
              Christiane Beyer
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ganzheitliche Gesundheitskonzepte, die Körper, Geist und Seele in Einklang bringen. 
              Mit Meta Vital Frequenztherapie und psychotherapeutischen Ansätzen für nachhaltiges Wohlbefinden.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Christiane Beyer. Alle Rechte vorbehalten.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Über Uns
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Angebote
                </a>
              </li>
              <li>
                <a 
                  href="/booking" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Termin buchen
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/qr/7A6KMAI4APQPI1" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="ml-1">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kontakt</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Musterstraße 123</li>
              <li>12345 Musterstadt</li>
              <li>Tel: <a href="tel:+491234567890" className="hover:text-primary transition-colors">+49 123 456 7890</a></li>
              <li>Email: <a href="mailto:contact@christianebeyer.de" className="hover:text-primary transition-colors">contact@christianebeyer.de</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex space-x-6">
            <a 
              href="/impressum" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Impressum
            </a>
            <a 
              href="/datenschutz" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}