
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Save } from 'lucide-react';

export function AdminSettings() {
  const [workingHours, setWorkingHours] = useState({
    startTime: '09:00',
    endTime: '17:00'
  });
  const [appointmentDuration, setAppointmentDuration] = useState(60);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weekendBookings, setWeekendBookings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Hier würden die Einstellungen in der Datenbank gespeichert werden
      // Für Demo-Zwecke nur ein Timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Einstellungen gespeichert');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Fehler beim Speichern der Einstellungen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Einstellungen</h2>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Speichern
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Arbeitszeiten</CardTitle>
            <CardDescription>
              Legen Sie die Standard-Arbeitszeiten für Ihre Praxis fest.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Beginn</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={workingHours.startTime}
                  onChange={(e) => setWorkingHours({...workingHours, startTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Ende</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={workingHours.endTime}
                  onChange={(e) => setWorkingHours({...workingHours, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Standard-Termindauer (Minuten)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                step="15"
                value={appointmentDuration}
                onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Buchungsoptionen</CardTitle>
            <CardDescription>
              Konfigurieren Sie, wie Termine gebucht und verwaltet werden.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoConfirm">Termine automatisch bestätigen</Label>
                <p className="text-sm text-muted-foreground">
                  Wenn aktiviert, werden neue Termine automatisch bestätigt.
                </p>
              </div>
              <Switch
                id="autoConfirm"
                checked={autoConfirm}
                onCheckedChange={setAutoConfirm}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekendBookings">Wochenend-Buchungen erlauben</Label>
                <p className="text-sm text-muted-foreground">
                  Ermöglicht Kunden, Termine am Wochenende zu buchen.
                </p>
              </div>
              <Switch
                id="weekendBookings"
                checked={weekendBookings}
                onCheckedChange={setWeekendBookings}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Benachrichtigungen</CardTitle>
            <CardDescription>
              Verwalten Sie E-Mail-Benachrichtigungen für Sie und Ihre Kunden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">E-Mail-Benachrichtigungen</Label>
                <p className="text-sm text-muted-foreground">
                  Aktivieren Sie E-Mail-Benachrichtigungen für neue Buchungen.
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              E-Mail-Benachrichtigungen erfordern eine gültige SMTP-Konfiguration.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
