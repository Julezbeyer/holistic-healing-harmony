
# Projekt-Dokumentation

## Änderungsprotokoll

### 09.04.2024
- Änderung der Terminbuchung von "Terminbestätigung" zu "Terminanfrage"
- Anpassung der Texte in BookingConfirmation.tsx und Booking.tsx
- Erstellung dieser Dokumentationsdatei
- Aktualisierung und Vervollständigung der Dokumentation mit allen Projektkomponenten

## Projektstruktur und Komponenten

### Hauptseiten (Pages)
- **Index.tsx**: Startseite mit Hero-Bereich, About-Sektion und weiteren Inhalten
- **Auth.tsx**: Authentifizierungsseite für Login und Registrierung
- **Booking.tsx**: Seite für die Terminanfrage (früher Terminbuchung)
- **Admin.tsx**: Admin-Bereich zur Verwaltung von Terminen und Zeitfenstern
- **NotFound.tsx**: 404-Fehlerseite

### Komponenten

#### Admin-Komponenten
- **AdminAuth.tsx**: Login-Formular für den Admin-Bereich
- **AdminAppointments.tsx**: Verwaltung und Übersicht der Terminanfragen
- **AdminTimeSlots.tsx**: Verwaltung der verfügbaren Zeitfenster

#### Booking-Komponenten
- **BookingConfirmation.tsx**: Bestätigungsseite für Terminanfragen
- **BookingForm.tsx**: Formular zur Eingabe persönlicher Daten bei Terminanfragen
- **DatePicker.tsx**: Auswahl von Datum und Uhrzeit für Termine

#### Seiten-Komponenten
- **Hero.tsx**: Hauptbanner mit Video-Hintergrund und Call-to-Action
- **About.tsx**: Vorstellung von Christiane Beyer mit Bild und Beschreibung
- **FeatureCard.tsx**: Darstellung von Leistungen in Karten-Format

#### UI-Komponenten (shadcn/ui)
- Avatar
- Button
- Card
- Collapsible
- Dropdown-Menu
- Navigation-Menu
- Select
- Tabs
- Toaster
- Form-Elemente (Input, FormField, etc.)
- Weitere UI-Komponenten

### Integrationen
- **Supabase**: Für Authentifizierung und Datenbank
  - Auth-System mit Email/Passwort
  - Datenbankoperationen für Termine und Zeitfenster

### Hooks
- **useAuth**: Hook zur Verwaltung der Authentifizierung

### Styling
- **Tailwind CSS**: Für das Styling der Anwendung
- Benutzerdefinierte Farben für Christiane Beyer (christiane-soft-blue, christiane-soft-purple)
- Animationen (float, float-slow)
- Responsive Design für verschiedene Gerätetypen

## Aktuelle Funktionalitäten

### Allgemeine Webseite
- Modernes, responsives Design mit Video-Hintergrund
- Informationsseiten über Christiane Beyer und angebotene Behandlungen
- Animationen und visuelle Effekte für ein ansprechendes Erscheinungsbild

### Authentifizierung
- Login mit E-Mail und Passwort
- Registrierung neuer Benutzer
- Automatische Weiterleitung nach erfolgreicher Anmeldung
- Spezielle Admin-Authentifizierung für den Admin-Bereich

### Terminanfrage-System
- Auswahl von Datum und Uhrzeit für einen Termin
- Eingabe persönlicher Daten
- Bestätigung der Anfrage (nicht mehr automatische Terminbestätigung)
- Benachrichtigung per E-Mail

### Admin-Bereich
- Geschützter Bereich nur für autorisierte Benutzer
- Tabellarische Übersicht aller Terminanfragen
- Möglichkeit, Termine zu bestätigen oder abzulehnen
- Verwaltung verfügbarer Zeitfenster
- Tabs-Navigation für einfachen Zugriff auf verschiedene Funktionen

## Technische Details
- React mit TypeScript
- Vite als Build-Tool
- React Router für die Navigation
- React Query für Datenabfragen
- Shadcn/UI als Komponenten-Bibliothek
- Tailwind CSS für Styling
- Supabase als Backend-as-a-Service

## Zukünftige Aufgaben und Erweiterungen
- Erweiterung des Admin-Bereichs mit Statistiken
- Implementierung eines Kalender-Widgets für bessere Terminübersicht
- E-Mail-Templates für verschiedene Benachrichtigungstypen
- Mehrsprachige Unterstützung
- Integration von Online-Bezahlmöglichkeiten
- Automatische Erinnerungen für bevorstehende Termine
- Blog-Bereich für Artikel zu Gesundheitsthemen
- Patienten-Portal mit Zugriff auf persönliche Daten und Behandlungspläne
- Integration von Video-Sprechstunden
- Feedback- und Bewertungssystem für Behandlungen
