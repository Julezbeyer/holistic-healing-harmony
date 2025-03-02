
export type UserRole = 'admin' | 'user';

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  timeSlotId: string;
}
