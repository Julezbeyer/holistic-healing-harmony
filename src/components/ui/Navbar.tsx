
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "react-router-dom";

export function Navbar() {
  const { t } = useLanguage();
  
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-medium">
          {t('home')}
        </Link>
        <Link to="/booking" className="font-medium">
          {t('booking')}
        </Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
}
