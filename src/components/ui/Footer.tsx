
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/lib/translations";

export function Footer() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };
  
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Christiane Beyer. Alle Rechte vorbehalten.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => handleLanguageChange('de')} 
              className={`text-sm ${language === 'de' ? 'font-bold text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Deutsch
            </button>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`text-sm ${language === 'en' ? 'font-bold text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('ar')} 
              className={`text-sm ${language === 'ar' ? 'font-bold text-primary' : 'text-gray-600 hover:text-gray-900'}`}
              dir="rtl"
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
