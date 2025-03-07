
import { addDays, format, parse } from 'date-fns';

/**
 * Checks if a date is a weekend day (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

/**
 * Formats a date for display
 */
export const formatDate = (date: string): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formats a time string for display
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  return time;
};

/**
 * Formats a date and time for display
 */
export function formatDateTime(date: string, time: string): string {
  if (!date || !time) return '';
  return `${date} um ${time} Uhr`;
}

/**
 * Generates time slots for a given date range
 */
export const generateTimeSlots = (
  startDate: Date,
  numberOfDays: number,
  startHour: number,
  endHour: number
) => {
  const slots = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = addDays(startDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');

    // Generate slots from startHour to endHour
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${Math.floor(hour).toString().padStart(2, '0')}:${(hour % 1 * 60).toString().padStart(2, '0')}`;
      
      // Calculate end time (1 hour later)
      const endTimeHour = hour + 1;
      const endTimeMinutes = (hour % 1) * 60;
      const endTime = `${Math.floor(endTimeHour).toString().padStart(2, '0')}:${endTimeMinutes.toString().padStart(2, '0')}`;

      slots.push({
        date: dateStr,
        startTime,
        endTime,
        isBooked: false
      });
    }
  }

  return slots;
};

/**
 * Generates time slots for a specific month
 */
export const generateTimeSlotsForMonth = (
  year: number,
  month: number, // 0-based (0 = January)
  availableDays: number[] = [1, 2, 3, 4, 5], // Default: Monday-Friday
  startHour: number = 9,
  endHour: number = 17,
  slotDuration: number = 60 // minutes
) => {
  const slots = [];
  
  // Create a date for the first day of the month
  const startDate = new Date(year, month, 1);
  
  // Calculate the last day of the month
  const endDate = new Date(year, month + 1, 0);
  
  // Iterate through each day of the month
  for (let day = 1; day <= endDate.getDate(); day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ...
    
    // Skip if this day is not in availableDays
    // Convert Sunday (0) to 7 for easier comparison
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    if (!availableDays.includes(adjustedDayOfWeek)) continue;
    
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    
    // Generate slots for this day
    for (let hour = startHour; hour < endHour; hour += slotDuration / 60) {
      const startTime = `${Math.floor(hour).toString().padStart(2, '0')}:${(hour % 1 * 60).toString().padStart(2, '0')}`;
      
      // Calculate end time
      const endTimeHour = hour + slotDuration / 60;
      const endTimeMinutes = (hour % 1) * 60;
      const endTime = `${Math.floor(endTimeHour).toString().padStart(2, '0')}:${endTimeMinutes.toString().padStart(2, '0')}`;
      
      slots.push({
        date: dateStr,
        startTime,
        endTime,
        isBooked: false
      });
    }
  }
  
  return slots;
};

/**
 * Get next N days from today
 */
export const getNextNDays = (n: number): Date[] => {
  const days: Date[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  return days;
};

/**
 * Generates simple time slots with hourly intervals
 */
export function generateTimeSlotsSimple(date: Date): { startTime: string; endTime: string; date: string }[] {
  const slots = [];
  const startHour = 9; // 9:00 Uhr
  const endHour = 17; // 17:00 Uhr
  const slotDuration = 60; // 60 Minuten pro Slot

  const formattedDate = date.toISOString().split('T')[0];

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;

    slots.push({
      date: formattedDate,
      startTime,
      endTime
    });
  }

  return slots;
}
