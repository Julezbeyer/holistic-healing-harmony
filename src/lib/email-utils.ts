
import { supabase } from '@/integrations/supabase/client';
import { Appointment, TimeSlot } from './types';
import { formatDate, formatTime } from './date-utils';

export const sendConfirmationEmail = async (
  appointment: Appointment, 
  timeSlot: TimeSlot
) => {
  try {
    // Supabase Edge Function aufrufen
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: { 
        appointment,
        timeSlot,
        recipient: appointment.email,
        subject: 'Ihre Terminbestätigung'
      }
    });
    
    if (error) throw error;
    
    console.log('Bestätigungs-E-Mail gesendet an:', appointment.email);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Bestätigungs-E-Mail:', error);
    throw error;
  }
};

export const sendReminderEmail = async (
  appointment: Appointment, 
  timeSlot: TimeSlot
) => {
  try {
    // Supabase Edge Function aufrufen
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: { 
        appointment,
        timeSlot,
        recipient: appointment.email,
        subject: 'Erinnerung an Ihren Termin'
      }
    });
    
    if (error) throw error;
    
    console.log('Erinnerungs-E-Mail gesendet an:', appointment.email);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Erinnerungs-E-Mail:', error);
    throw error;
  }
};
