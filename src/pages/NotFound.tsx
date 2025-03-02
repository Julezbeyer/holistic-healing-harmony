import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t, dir } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" dir={dir}>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Button asChild>
        <Link to="/">{t('home')}</Link>
      </Button>
    </div>
  );
}
