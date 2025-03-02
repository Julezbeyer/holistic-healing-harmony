
import { AppointmentStats, TimeSlotStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users } from 'lucide-react';

type StatsCardsProps = {
  stats: {
    appointments: AppointmentStats;
    timeSlots: TimeSlotStats;
  };
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Termine gesamt</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.appointments.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.appointments.confirmed} bestätigt, {stats.appointments.pending} ausstehend
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zeitfenster</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.timeSlots.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.timeSlots.available} verfügbar, {stats.timeSlots.booked} gebucht
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Auslastung</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.timeSlots.total > 0 
              ? Math.round((stats.timeSlots.booked / stats.timeSlots.total) * 100) 
              : 0}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Gebuchte Zeitfenster
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
