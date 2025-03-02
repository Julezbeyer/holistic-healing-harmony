
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
                  href="#therapy" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Therapieansätze
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
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kontakt</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Wilhelm-Blos-Straße 59</li>
              <li>71636 Ludwigsburg</li>
              <li>+49 172 9870910</li>
              <li>beyer1510@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-input flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            Designed with ❤️ for holistic health and wellbeing
          </p>
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
