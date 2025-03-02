
export type TimeSlot = {
  id: string;
  date: string; // ISO-Format
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isAvailable: boolean;
};

export type Appointment = {
  id: string;
  timeSlotId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string; // Frontend-Eigenschaft, wird in der DB als 'notes' gespeichert
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
};

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

// Admin Dashboard Types
export type AppointmentStats = {
  total: number;
  confirmed: number;
  cancelled: number;
  pending: number;
};

export type TimeSlotStats = {
  total: number;
  available: number;
  booked: number;
};

// User Role Types
export type UserRole = 'admin' | 'user';
