export type TimeSlot = {
  id: string;
  date: string; // ISO-Format
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isBooked: boolean; // Changed from isAvailable
};

export type Appointment = {
  id: string;
  timeSlotId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string; // Frontend-Eigenschaft, wird in der DB als 'notes' gespeichert
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
};