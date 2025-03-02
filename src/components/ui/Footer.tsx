
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/lib/translations";
import { Check, Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

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
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{language === 'de' ? 'Deutsch' : language === 'en' ? 'English' : 'العربية'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                  <div className="flex items-center justify-between w-full">
                    <span>Deutsch</span>
                    {language === 'de' && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  <div className="flex items-center justify-between w-full">
                    <span>English</span>
                    {language === 'en' && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  <div className="flex items-center justify-between w-full">
                    <span>العربية</span>
                    {language === 'ar' && <Check className="h-4 w-4 ml-2" />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </footer>
  );
}
