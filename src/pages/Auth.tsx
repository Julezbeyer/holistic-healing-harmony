
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Separate form component
type AuthFormProps = {
  isSignUp: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

const AuthForm = ({ isSignUp, email, setEmail, password, setPassword, loading, onSubmit }: AuthFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
        E-Mail
      </label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ihre E-Mail-Adresse"
        required
      />
    </div>
    
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
        Passwort
      </label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ihr Passwort"
        required
        minLength={6}
      />
    </div>
    
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? 'Verarbeitung...' : isSignUp ? 'Registrieren' : 'Anmelden'}
    </Button>
  </form>
);

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/');
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail für die Bestätigung.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Erfolgreich eingeloggt!');
      }
    } catch (error: any) {
      const errorMessage = error.error_description || error.message || 'Ein Fehler ist aufgetreten';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-christiane-soft-blue/20 to-christiane-soft-purple/20">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-card">
        <div className="text-center mb-8">
          <h1 className="heading-lg mb-2">{isSignUp ? 'Registrieren' : 'Anmelden'}</h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Erstellen Sie ein Konto, um Termine zu buchen' 
              : 'Melden Sie sich an, um fortzufahren'}
          </p>
        </div>
        
        <AuthForm 
          isSignUp={isSignUp}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          onSubmit={handleAuthentication}
        />
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline text-sm"
          >
            {isSignUp 
              ? 'Bereits registriert? Anmelden' 
              : 'Noch kein Konto? Registrieren'}
          </button>
        </div>
      </div>
    </div>
  );
}
