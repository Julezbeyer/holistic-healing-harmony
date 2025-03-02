
-- Erstellen der Tabelle für Zeitfenster
CREATE TABLE IF NOT EXISTS public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Erstellen von Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_time_slots_date ON public.time_slots(date);
CREATE INDEX IF NOT EXISTS idx_appointments_time_slot_id ON public.appointments(time_slot_id);

-- Row Level Security einrichten
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policies für anonymen Zugriff (für deine öffentliche App)
CREATE POLICY "Anonymer Lesezugriff auf Zeitfenster" 
ON public.time_slots FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anonymer Schreibzugriff auf Zeitfenster" 
ON public.time_slots FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Anonymer Aktualisierungszugriff auf Zeitfenster" 
ON public.time_slots FOR UPDATE 
TO anon 
USING (true);

CREATE POLICY "Anonymer Lesezugriff auf Buchungen" 
ON public.appointments FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anonymer Schreibzugriff auf Buchungen" 
ON public.appointments FOR INSERT 
TO anon 
WITH CHECK (true);
