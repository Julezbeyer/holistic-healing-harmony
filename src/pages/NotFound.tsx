import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFound() {
  const location = useLocation();
  const { t, dir } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" dir={dir}>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6">{t('Page not found')}</p>
      <Button asChild>
        <Link to="/">{t('home')}</Link>
      </Button>
    </div>
  );
}