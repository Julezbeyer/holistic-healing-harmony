export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time: string): string => {
  return time;
};

export const generateTimeSlots = (
  date: Date,
  startHour: number = 9,
  endHour: number = 17,
  durationMinutes: number = 60
): Omit<TimeSlot, 'id'>[] => {
  const slots: Omit<TimeSlot, 'id'>[] = [];
  const dateStr = date.toISOString().split('T')[0];

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTimeHour = hour + (durationMinutes / 60);
    const endTimeMinutes = (durationMinutes % 60);
    const endTime = `${Math.floor(endTimeHour).toString().padStart(2, '0')}:${endTimeMinutes.toString().padStart(2, '0')}`;

    slots.push({
      date: dateStr,
      startTime,
      endTime,
      isAvailable: true
    });
  }

  return slots;
};

// Hilfsfunktion zum Generieren von Zeitfenstern für einen Tag
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

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};