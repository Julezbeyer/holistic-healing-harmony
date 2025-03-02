
import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Appointment, TimeSlot } from '@/lib/types';
import { MoreHorizontal, Mail, Phone, Trash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

interface AppointmentsTableProps {
  appointments: Appointment[];
  timeSlots: TimeSlot[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function AppointmentsTable({ appointments, timeSlots, isLoading, onRefresh }: AppointmentsTableProps) {
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find time slot for an appointment
  const getTimeSlot = (appointment: Appointment) => {
    return timeSlots.find(ts => ts.id === appointment.timeSlotId);
  };

  // Delete appointment handler
  const handleDeleteAppointment = async () => {
    if (!deleteAppointmentId) return;
    
    try {
      setIsDeleting(true);
      
      // Get the appointment to find its time slot
      const appointmentToDelete = appointments.find(a => a.id === deleteAppointmentId);
      if (!appointmentToDelete) throw new Error('Termin nicht gefunden');
      
      // Delete the appointment
      const { error: deleteError } = await supabase
        .from('appointments')
        .delete()
        .eq('id', deleteAppointmentId);
      
      if (deleteError) throw deleteError;
      
      // Update the time slot to be available again
      const { error: updateError } = await supabase
        .from('time_slots')
        .update({ is_booked: false })
        .eq('id', appointmentToDelete.timeSlotId);
      
      if (updateError) throw updateError;
      
      toast.success('Termin erfolgreich gelöscht');
      setDeleteAppointmentId(null);
      onRefresh();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Fehler beim Löschen des Termins');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div>Termine werden geladen...</div>;
  }

  if (appointments.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Keine Termine vorhanden</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Kontakt</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Uhrzeit</TableHead>
              <TableHead>Erstellt am</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const timeSlot = getTimeSlot(appointment);
              return (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3" /> {appointment.email}
                      </div>
                      {appointment.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3" /> {appointment.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {timeSlot ? format(new Date(timeSlot.date), 'dd.MM.yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.createdAt), 'dd.MM.yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menü öffnen</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setDeleteAppointmentId(appointment.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteAppointmentId} onOpenChange={(open) => !open && setDeleteAppointmentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Termin löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie diesen Termin wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDeleteAppointment();
              }} 
              disabled={isDeleting}
            >
              {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
