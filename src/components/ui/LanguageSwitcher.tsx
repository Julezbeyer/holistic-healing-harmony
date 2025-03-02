
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="w-16"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}
