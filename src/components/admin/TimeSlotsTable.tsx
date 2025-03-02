
import React, { useState } from 'react';
import { format } from 'date-fns';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlot } from '@/lib/types';
import { MoreHorizontal, PlusCircle, Edit, Trash, CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TimeSlotsTableProps {
  timeSlots: TimeSlot[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function TimeSlotsTable({ timeSlots, isLoading, onRefresh }: TimeSlotsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteTimeSlotId, setDeleteTimeSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTimeSlot, setNewTimeSlot] = useState<{
    date: Date | undefined;
    startTime: string;
    endTime: string;
  }>({
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
  });

  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null);

  const handleAddTimeSlot = async () => {
    if (!newTimeSlot.date || !newTimeSlot.startTime || !newTimeSlot.endTime) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formattedDate = format(newTimeSlot.date, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('time_slots')
        .insert([
          {
            date: formattedDate,
            start_time: newTimeSlot.startTime,
            end_time: newTimeSlot.endTime,
            is_booked: false
          }
        ])
        .select();
      
      if (error) throw error;
      
      toast.success('Zeitfenster erfolgreich hinzugefügt');
      setIsAddDialogOpen(false);
      onRefresh();
      
      // Reset form
      setNewTimeSlot({
        date: new Date(),
        startTime: '09:00',
        endTime: '10:00',
      });
    } catch (error) {
      console.error('Error adding time slot:', error);
      toast.error('Fehler beim Hinzufügen des Zeitfensters');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTimeSlot = (timeSlot: TimeSlot) => {
    setEditingTimeSlot(timeSlot);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTimeSlot = async () => {
    if (!editingTimeSlot) return;

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('time_slots')
        .update({
          start_time: editingTimeSlot.startTime,
          end_time: editingTimeSlot.endTime
        })
        .eq('id', editingTimeSlot.id);
      
      if (error) throw error;
      
      toast.success('Zeitfenster erfolgreich aktualisiert');
      setIsEditDialogOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Error updating time slot:', error);
      toast.error('Fehler beim Aktualisieren des Zeitfensters');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTimeSlot = async () => {
    if (!deleteTimeSlotId) return;
    
    try {
      setIsSubmitting(true);
      
      // Check if the time slot is booked
      const timeSlot = timeSlots.find(ts => ts.id === deleteTimeSlotId);
      if (timeSlot && !timeSlot.isAvailable) {
        toast.error('Gebuchte Zeitfenster können nicht gelöscht werden');
        setDeleteTimeSlotId(null);
        return;
      }
      
      const { error } = await supabase
        .from('time_slots')
        .delete()
        .eq('id', deleteTimeSlotId);
      
      if (error) throw error;
      
      toast.success('Zeitfenster erfolgreich gelöscht');
      setDeleteTimeSlotId(null);
      onRefresh();
    } catch (error) {
      console.error('Error deleting time slot:', error);
      toast.error('Fehler beim Löschen des Zeitfensters');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Zeitfenster werden geladen...</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Zeitfenster hinzufügen
        </Button>
      </div>

      {timeSlots.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Keine Zeitfenster vorhanden. Fügen Sie neue Zeitfenster hinzu.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Uhrzeit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((timeSlot) => (
                <TableRow key={timeSlot.id}>
                  <TableCell>{format(new Date(timeSlot.date), 'dd.MM.yyyy')}</TableCell>
                  <TableCell>{timeSlot.startTime} - {timeSlot.endTime}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      timeSlot.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {timeSlot.isAvailable ? 'Verfügbar' : 'Gebucht'}
                    </div>
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
                        <DropdownMenuItem onClick={() => handleEditTimeSlot(timeSlot)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteTimeSlotId(timeSlot.id)}
                          disabled={!timeSlot.isAvailable}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Time Slot Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zeitfenster hinzufügen</DialogTitle>
            <DialogDescription>
              Erstellen Sie ein neues Zeitfenster für Termine.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Datum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTimeSlot.date ? (
                      format(newTimeSlot.date, 'PPP')
                    ) : (
                      <span>Datum auswählen</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newTimeSlot.date}
                    onSelect={(date) => setNewTimeSlot({ ...newTimeSlot, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Startzeit</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">Endzeit</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Abbrechen
            </Button>
            <Button onClick={handleAddTimeSlot} disabled={isSubmitting}>
              {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Time Slot Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zeitfenster bearbeiten</DialogTitle>
            <DialogDescription>
              Aktualisieren Sie die Zeiten für dieses Zeitfenster.
            </DialogDescription>
          </DialogHeader>
          {editingTimeSlot && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Datum</Label>
                <div className="p-2 border rounded-md bg-muted">
                  {format(new Date(editingTimeSlot.date), 'dd.MM.yyyy')}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editStartTime">Startzeit</Label>
                  <Input
                    id="editStartTime"
                    type="time"
                    value={editingTimeSlot.startTime}
                    onChange={(e) => setEditingTimeSlot({
                      ...editingTimeSlot,
                      startTime: e.target.value
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editEndTime">Endzeit</Label>
                  <Input
                    id="editEndTime"
                    type="time"
                    value={editingTimeSlot.endTime}
                    onChange={(e) => setEditingTimeSlot({
                      ...editingTimeSlot,
                      endTime: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Abbrechen
            </Button>
            <Button onClick={handleUpdateTimeSlot} disabled={isSubmitting}>
              {isSubmitting ? 'Wird aktualisiert...' : 'Aktualisieren'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Time Slot Confirmation */}
      <AlertDialog open={!!deleteTimeSlotId} onOpenChange={(open) => !open && setDeleteTimeSlotId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Zeitfenster löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie dieses Zeitfenster wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDeleteTimeSlot();
              }} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
