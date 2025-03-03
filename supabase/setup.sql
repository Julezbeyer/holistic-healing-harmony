-- Aktivieren der Supabase Auth Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Erstellen der Tabelle für Zeitfenster
CREATE TABLE IF NOT EXISTS public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabelle für Admin-Benutzer
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Erstellen der Tabelle für Buchungen
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_slot_id UUID REFERENCES public.time_slots(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Erstellen von Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_time_slots_date ON public.time_slots(date);
CREATE INDEX IF NOT EXISTS idx_appointments_time_slot_id ON public.appointments(time_slot_id);

-- Row Level Security einrichten
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Bestehende Policies löschen, falls sie existieren
DROP POLICY IF EXISTS "Anonymer Lesezugriff auf Zeitfenster" ON public.time_slots;
DROP POLICY IF EXISTS "Anonymer Schreibzugriff auf Zeitfenster für Besucher" ON public.time_slots;
DROP POLICY IF EXISTS "Anonymer Aktualisierungszugriff auf Zeitfenster für Besucher" ON public.time_slots;
DROP POLICY IF EXISTS "Anonymer Lesezugriff auf Buchungen" ON public.appointments;
DROP POLICY IF EXISTS "Anonymer Schreibzugriff auf Buchungen für Besucher" ON public.appointments;
DROP POLICY IF EXISTS "Admin Lesezugriff auf Zeitfenster" ON public.time_slots;
DROP POLICY IF EXISTS "Admin Schreibzugriff auf Zeitfenster" ON public.time_slots;
DROP POLICY IF EXISTS "Admin Aktualisierungszugriff auf Zeitfenster" ON public.time_slots;
DROP POLICY IF EXISTS "Admin Löschzugriff auf Zeitfenster" ON public.time_slots;
DROP POLICY IF EXISTS "Admin Lesezugriff auf Buchungen" ON public.appointments;
DROP POLICY IF EXISTS "Admin Schreibzugriff auf Buchungen" ON public.appointments;
DROP POLICY IF EXISTS "Admin Aktualisierungszugriff auf Buchungen" ON public.appointments;
DROP POLICY IF EXISTS "Admin Löschzugriff auf Buchungen" ON public.appointments;
DROP POLICY IF EXISTS "Admin kann admin_users ansehen" ON public.admin_users;
DROP POLICY IF EXISTS "Admin kann admin_users verwalten" ON public.admin_users;

-- Policies für anonymen Zugriff (für deine öffentliche App) neu erstellen
CREATE POLICY "Anonymer Lesezugriff auf Zeitfenster" 
ON public.time_slots FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anonymer Schreibzugriff auf Zeitfenster für Besucher" 
ON public.time_slots FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anonymer Aktualisierungszugriff auf Zeitfenster für Besucher" 
ON public.time_slots FOR UPDATE 
TO anon 
USING (true);

CREATE POLICY "Anonymer Lesezugriff auf Buchungen" 
ON public.appointments FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anonymer Schreibzugriff auf Buchungen für Besucher" 
ON public.appointments FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policies für authentifizierte Benutzer (Admins)
CREATE POLICY "Admin Lesezugriff auf Zeitfenster" 
ON public.time_slots FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin Schreibzugriff auf Zeitfenster" 
ON public.time_slots FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admin Aktualisierungszugriff auf Zeitfenster" 
ON public.time_slots FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Admin Löschzugriff auf Zeitfenster" 
ON public.time_slots FOR DELETE 
TO authenticated 
USING (true);

CREATE POLICY "Admin Lesezugriff auf Buchungen" 
ON public.appointments FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin Schreibzugriff auf Buchungen" 
ON public.appointments FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admin Aktualisierungszugriff auf Buchungen" 
ON public.appointments FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Admin Löschzugriff auf Buchungen" 
ON public.appointments FOR DELETE 
TO authenticated 
USING (true);

-- Tabelle für admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin kann admin_users ansehen" 
ON public.admin_users FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin kann admin_users verwalten" 
ON public.admin_users FOR ALL 
TO authenticated 
USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read their own profile" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create policy for admins to read all profiles
CREATE POLICY "Admins can read all profiles" 
  ON public.users 
  FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policy for admins to modify all profiles
CREATE POLICY "Admins can modify all profiles" 
  ON public.users 
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create trigger to automatically insert new users into users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert admin user if not exists (replace with your admin user ID)
-- You'll need to manually set an admin user initially
-- Example: UPDATE public.users SET role = 'admin' WHERE id = '[YOUR-USER-ID]';